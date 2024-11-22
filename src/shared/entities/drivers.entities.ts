export interface IDrivers {
  id?: number;
  name: string;
  description: string;
  car: string;
  tax: number;
  min_km: number;
  created_at?: Date;
  updated_at?: Date;
}
