import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IRides } from '../entities';
import { Type } from 'class-transformer';
import { IsDifferentFrom } from '../decatorators';
import { DriversDTO } from './';

export class RidesDTO implements IRides {
  @IsNumber()
  customer_id: number;

  @IsNumber()
  @IsOptional()
  driver_id: number;

  @IsString()
  origin: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsDifferentFrom('origin')
  destination: string;

  @IsOptional()
  @IsNumber()
  distance: number;

  @IsOptional()
  @IsString()
  duration: string;
}

export class RidesDTOConfirm extends RidesDTO {
  constructor() {
    super();
  }

  @IsNumber()
  value: number;

  @ValidateNested()
  @Type(() => DriversDTO)
  driver: DriversDTO;
}
