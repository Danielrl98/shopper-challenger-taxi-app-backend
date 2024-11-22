export interface IRides {
  id?: number;
  driver_id: number;
  customer_id: number;
  origin: string;
  amount: number;
  destination: string;
  distance: number;
  duration: string;
  created_at?: Date;
  updated_at?: Date;
}
