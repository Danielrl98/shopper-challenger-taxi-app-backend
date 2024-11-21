export class IReviews {
  id?: number;
  id_driver: number;
  id_ride: number;
  id_customer: number;
  comment: string;
  stars: number;
  created_at?: Date;
  updated_at?: Date;
}
