export class IReviews {
  id?: number;
  driver_id: number;
  ride_id: number;
  customer_id: number;
  comment: string;
  stars: number;
  created_at?: Date;
  updated_at?: Date;
}
