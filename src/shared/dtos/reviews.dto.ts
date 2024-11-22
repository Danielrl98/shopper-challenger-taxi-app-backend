import { IsNumber, IsString, MinLength } from 'class-validator';
import { IReviews } from '../entities';

export class ReviewsDTO implements IReviews {
  @IsNumber()
  driver_id: number;

  @IsNumber()
  ride_id: number;

  @IsNumber()
  customer_id: number;

  @IsString()
  @MinLength(5)
  comment: string;

  @IsNumber()
  stars: number;
}
