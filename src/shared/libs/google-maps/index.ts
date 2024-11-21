import {
  Client,
  GeocodeResult,
} from '@googlemaps/google-maps-services-js';
import { config } from '../../../shared/config/env';
import { ICoordinates, ICalculatedMaps } from 'src/shared/entities';
import { Logger } from '@nestjs/common';

const client = new Client({});

export class GoogleMaps {
  constructor(private readonly Logger: Logger) {}
  async getAddressCoordinates(address: string) {
    try {
      const response = await client.geocode({
        params: { address, key: config.GOOGLE_API_KEY },
      });
      const coordinates = response.data.results[0].geometry.location;
      return { coordinates, response: response.data.results[0] } as {
        coordinates: ICoordinates;
        response: GeocodeResult;
      };
    } catch (error) {
      this.Logger.error('Err', error);
    }
    return false;
  }

  async calculateTravelTime(
    start: ICoordinates,
    end: ICoordinates,
  ): Promise<boolean | ICalculatedMaps> {
    try {
      const response = await client.distancematrix({
        params: {
          origins: [`${start.lat},${start.lng}`],
          destinations: [`${end.lat},${end.lng}`],
          key: config.GOOGLE_API_KEY,
        },
      });

      const distance = parseFloat(
        (response.data.rows[0].elements[0].distance.value / 1000).toFixed(2),
      );
      const duration = (
        response.data.rows[0].elements[0].duration.value / 3600
      ).toFixed(2);

      return { distance, duration: this.formatToHours(duration) };
    } catch (error) {
      this.Logger.error('Err', error);
    }

    return false;
  }
  private formatToHours(decimal: string) { 
    const hours = Math.floor(parseFloat(decimal)); 
    const minutes = Math.round((parseFloat(decimal) - hours) * 60); 
    if(hours === 0){
      return `${minutes} minutos`; 
    }
    return `${hours} horas e ${minutes} minutos`; 
  }
}
