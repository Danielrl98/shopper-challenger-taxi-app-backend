import { IsNumber, IsString, MinLength } from 'class-validator';
import { IReviews } from '../entities';

export class ReviewsDTO implements IReviews {
  @IsNumber()
  id_driver: number;

  @IsNumber()
  id_ride: number;

  @IsNumber()
  id_customer: number;

  @IsString()
  @MinLength(5)
  comment: string;

  @IsNumber()
  stars: number;
}
