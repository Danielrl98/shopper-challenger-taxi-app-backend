import { GoogleMaps } from '../../src/shared/libs/google-maps';
import { Logger } from '@nestjs/common';

const logger: Logger = new Logger();
describe('Test integration google maps', () => {
  it('Should return coordinates', async () => {
    const coordinates = await new GoogleMaps(logger).getAddressCoordinates(
      'Rua Cosme Velho 513 – Cosme Velho',
    );
    logger.log(coordinates);
    expect(coordinates).toBeTruthy();
  });

  it('Should return calculate coordinates', async () => {
    const startCoordinates = {
      lat: -22.904748,
      lng: -47.060122,
    };
    const endCoordinates = {
      lat: -22.9405812,
      lng: -43.1984924,
    };
    const coordinates = await new GoogleMaps(logger).calculateTravelTime(
      startCoordinates,
      endCoordinates,
    );
    logger.log(coordinates);
    expect(coordinates).toBeTruthy();
  });
});
