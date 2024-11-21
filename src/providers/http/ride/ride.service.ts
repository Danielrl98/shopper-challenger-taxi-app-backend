import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { IRides } from 'src/shared/entities';
import { IRideResponse } from './ride.interface';
import { GoogleMaps } from '../../../shared/libs/google-maps';
import { ICoordinates, ICalculatedMaps } from 'src/shared/entities';
import { DriversRepository } from '../../../shared/repository/drivers.repository';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';
import { CustomException } from 'src/shared/common';

@Injectable()
export class RideService {
  constructor(
    private readonly logger: Logger,
    private readonly googleMaps: GoogleMaps,
    private readonly driversRepository: DriversRepository,
  ) {}
  async estimate(ride: IRides): Promise<IRideResponse | HttpException> {
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
      throw new CustomException('No drivers register', HttpStatus.BAD_REQUEST);
    }

    const driverFilter = drivers.filter(
      (driver) => driver.min_km < calculateDistance.distance,
    );

    if (driverFilter.length === 0) {
      throw new CustomException(
        'no Drivers available on this route',
        HttpStatus.BAD_REQUEST,
      );
    }

    const driver = driverFilter[0];

    let valueRide = driver.tax

    for (let i = 0; i <  calculateDistance.distance ;i  ++) {
        if(i % 5 === 0){
          valueRide = valueRide + 3.00
        }
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
      options: [
        {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.car,
          review: {
            rating: driver.stars,
            comment: driver.description,
          },
          value: valueRide,
        },
      ],
      routeResponse: startCoordinates.response,
    };

    this.logger.log(`Ride estimated for driver: ${driver.name}`);

    return response;
  }

}
