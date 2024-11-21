import { Body, Controller, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { RidesDTO } from 'src/shared/dtos/rides.dto';

@Controller('ride')
export class RideController {
  constructor(

    private readonly rideService: RideService,
  ) {}
  @Post('estimate')
  async createRide(@Body() body: RidesDTO) {
    return this.rideService.estimate(body);
  }
}
