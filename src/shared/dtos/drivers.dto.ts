import { IDrivers } from '../entities';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class DriversDTO implements IDrivers {
  @MinLength(5)
  @MaxLength(30)
  @IsString()
  name: string;

  @MinLength(5)
  @MaxLength(500)
  @IsString()
  description: string;

  @MinLength(5)
  @MaxLength(10)
  @IsString()
  car: string;

  @IsString()
  duration: string;

  @MaxLength(5)
  @IsNumber()
  stars: number;

  @MinLength(3)
  @IsNumber()
  tax: number;

  @IsNumber()
  min_km: number;

  @IsNumber()
  rate: number;
}
