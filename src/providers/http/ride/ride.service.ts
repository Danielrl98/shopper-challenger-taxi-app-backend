import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { IRides } from '../../../shared/entities';
import { IRideResponse } from './ride.interface';
import { GoogleMaps } from '../../../shared/libs/google-maps';
import { ICoordinates, ICalculatedMaps } from '../../../shared/entities';
import {
  DriversRepository,
  RidesRepository,
  CustomersRepository,
  ReviewsRepository,
} from '../../../shared/repository';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';
import { CustomException } from '../../../shared/common';
import { RidesDTOConfirm } from '../../../shared/dtos';

@Injectable()
export class RideService {
  constructor(
    private readonly logger: Logger,
    private readonly googleMaps: GoogleMaps,
    private readonly driversRepository: DriversRepository,
    private readonly ridesRepository: RidesRepository,
    private readonly reviewsRepository: ReviewsRepository,
    private readonly customersRepository: CustomersRepository,
  ) {}
  async estimateRide(ride: IRides): Promise<IRideResponse | HttpException> {
    const startCoordinates = (await this.googleMaps.getAddressCoordinates(
      ride.origin,
    )) as { coordinates: ICoordinates; response: GeocodeResult };
    const endCoordinates = (await this.googleMaps.getAddressCoordinates(
      ride.destination,
    )) as { coordinates: ICoordinates; response: GeocodeResult };

    const calculateDistance = (await this.googleMaps.calculateTravelTime(
      startCoordinates.coordinates,
      endCoordinates.coordinates,
    )) as ICalculatedMaps;

    const drivers = await this.driversRepository.findManyIDrivers();

    if (drivers.length === 0) {
      throw new CustomException(
        'No drivers register',
        HttpStatus.BAD_REQUEST,
        'DRIVER_NOT_FOUND',
      );
    }

    const driverFilter = drivers.filter(
      (driver) => driver.min_km < calculateDistance.distance,
    );

    if (driverFilter.length === 0) {
      throw new CustomException(
        'no Drivers available on this route',
        HttpStatus.NOT_ACCEPTABLE,
        'INVALID_DISTANCE',
      );
    }

    const optionsDrivers = [];

    for (const driver of driverFilter) {
      let valueRide = driver.tax;

      for (let i = 0; i < calculateDistance.distance; i++) {
        if (i % 5 === 0) {
          valueRide = valueRide + 3.0;
        }
      }

      const review = await this.reviewsRepository.findFirstReview(driver.id);

      if (!review) continue;

      optionsDrivers.push({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: review.stars ?? 0,
          comment: review.comment ?? '',
        },
        value: valueRide,
      });
    }

    const response: IRideResponse = {
      origin: {
        latitude: startCoordinates.coordinates.lat,
        longitude: startCoordinates.coordinates.lng,
      },
      destination: {
        latitude: endCoordinates.coordinates.lat,
        longitude: endCoordinates.coordinates.lng,
      },
      distance: calculateDistance.distance,
      duration: calculateDistance.duration,
      options: optionsDrivers,
      routeResponse: {
        start: startCoordinates.response,
        end: endCoordinates.response
      },
    };

    return response;
  }

  async confirmRide(body: RidesDTOConfirm) {
    const drivers = await this.driversRepository.findDriverById(body.driver.id);

    if (!drivers) {
      throw new CustomException(
        'confirm ride error',
        HttpStatus.NOT_FOUND,
        'DRIVER_NOT_FOUND',
      );
    }

    const customer = await this.customersRepository.getCustomerById(
      body.customer_id,
    );

    if (!customer) {
      throw new CustomException(
        'confirm ride error',
        HttpStatus.NOT_FOUND,
        'CUSTOMER_NOT_FOUND',
      );
    }

    const result = await this.ridesRepository.createRide({
      driver_id: body.driver.id,
      customer_id: body.customer_id,
      origin: body.origin,
      amount: body.value,
      destination: body.destination,
      distance: body.distance,
      duration: body.duration,
    });

    this.logger.debug(result);

    return {
      success: true,
    };
  }

  async listRides(customer_id: number, driver_id: number) {
    const driver = await this.driversRepository.findDriverById(driver_id);

    if (!driver) {
      throw new CustomException(
        'confirm ride error',
        HttpStatus.NOT_FOUND,
        'INVALID_DRIVER',
      );
    }

    const customer =
      await this.customersRepository.getCustomerById(customer_id);

    if (!customer) {
      throw new CustomException(
        'confirm ride error',
        HttpStatus.NOT_FOUND,
        'CUSTOMER_NOT_FOUND',
      );
    }

    const allRides = await this.ridesRepository.findManyRides(
      driver_id,
      customer_id,
    );

    const rides = [];

    for (const ride of allRides) {
      rides.push({
        id: ride.id,
        date: ride.created_at,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: ride.amount,
      });
    }

    if (rides.length === 0) {
      throw new CustomException(
        'no rides found',
        HttpStatus.NOT_FOUND,
        'NO_RIDES_FOUND',
      );
    }

    return {
      customer_id: customer.id,
      rides: rides,
    };
  }
}
