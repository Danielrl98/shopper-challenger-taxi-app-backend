import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { RidesDTO, RidesDTOConfirm } from '../../../shared/dtos/rides.dto';
import { CustomException } from 'src/shared/common';

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
  estimeRide(@Body() body: RidesDTO) {
    return this.rideService.estimateRide(body);
  }

  @Patch('confirm')
  @HttpCode(200)
  confirmRide(@Body() body: RidesDTOConfirm) {
    return this.rideService.confirmRide(body);
  }

  @Get(':customer_id')
  listRides(
    @Param() param: { customer_id: number },
    @Query() query: { driver_id: number },
  ) {
    if (isNaN(Number(param.customer_id))) {
      throw new CustomException(
        'customer_id must be a number',
        HttpStatus.BAD_REQUEST,
        'CUSTOMER_ID_INVALID',
      );
    }

    if (isNaN(Number(query.driver_id))) {
      throw new CustomException(
        'driver_id must be a number',
        HttpStatus.BAD_REQUEST,
        'DRIVER_ID_INVALID',
      );
    }

    return this.rideService.listRides(
      parseInt(param.customer_id.toString()),
      parseInt(query.driver_id.toString()),
    );
  }
}
