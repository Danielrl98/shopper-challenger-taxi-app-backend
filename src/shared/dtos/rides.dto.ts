import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IRides, StatusRides } from '../entities';
import { Exclude } from 'class-transformer';

export class RidesDTO implements IRides {
  @IsNumber()
  id_customer: number;

  @IsNumber()
  id_driver: number;

  @IsEnum(StatusRides)
  @IsOptional()
  status: StatusRides;

  @IsString()
  origin: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  destination: string;

  @Exclude()
  distance: number;

  @Exclude()
  duration: string;
}
