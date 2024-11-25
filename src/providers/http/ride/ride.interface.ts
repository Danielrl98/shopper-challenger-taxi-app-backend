import { GeocodeResult } from '@googlemaps/google-maps-services-js';

export interface IRideResponse {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: Option[];
  routeResponse: {
    start: GeocodeResult,
    end: GeocodeResult
  };
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Option {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

export interface Review {
  rating: number;
  comment: string;
}
