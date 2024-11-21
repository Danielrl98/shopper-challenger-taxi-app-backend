export enum StatusRides {
  PENDING = 'pending',
  PROGRESSING = 'progressing',
  COMPLETED = 'completed',
}

export interface IRides {
  id?: number;
  id_driver: number;
  id_customer: number;
  status: string;
  origin: string;
  amount: number;
  destination: string;
  distance: number;
  duration: string;
  created_at?: Date;
  updated_at?: Date;
}
