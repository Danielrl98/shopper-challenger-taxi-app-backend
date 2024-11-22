import { Exclude } from 'class-transformer';
import { IDrivers } from '../entities';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class DriversDTO implements IDrivers {
  @IsInt()
  id: number;

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  name: string;

  @Exclude()
  description: string;

  @Exclude()
  car: string;

  @Exclude()
  duration: string;

  @Exclude()
  tax: number;

  @Exclude()
  min_km: number;

  @Exclude()
  rate: number;
}
