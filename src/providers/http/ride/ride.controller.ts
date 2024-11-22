import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { RidesDTO, RidesDTOConfirm } from '../../../shared/dtos/rides.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Get()
  healthCheck() {
    return {
      message: 'Ride API is running',
    };
  }
  @Post('estimate')
  @HttpCode(200)
  async createRide(@Body() body: RidesDTO) {
    return this.rideService.createRide(body);
  }

  @Patch('confirm')
  @HttpCode(200)
  async confirmRide(@Body() body: RidesDTOConfirm) {
    return this.rideService.confirmRide(body);
  }
}
