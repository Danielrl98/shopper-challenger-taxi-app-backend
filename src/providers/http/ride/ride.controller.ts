import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
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
  createRide(@Body() body: RidesDTO) {
    return this.rideService.createRide(body);
  }

  @Patch('confirm')
  @HttpCode(200)
  confirmRide(@Body() body: RidesDTOConfirm) {
      return this.rideService.confirmRide(body);
    }

  @Get(':customer_id')
  listRides(@Param() param: { customer_id: string }, @Query() query: { driver_id: number}){
    return {
      param,
      query
    }
  }
}
