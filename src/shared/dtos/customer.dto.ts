import { IsString, MinLength } from 'class-validator';
import { ICustomers } from '../entities';

export class CustomerDTO implements ICustomers {
  @MinLength(3)
  @IsString()
  name: string;
}
