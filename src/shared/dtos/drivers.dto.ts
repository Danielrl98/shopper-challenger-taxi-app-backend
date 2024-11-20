import { Exclude } from "class-transformer";
import { Drivers } from "../entities";
import { MaxLength, MinLength } from "class-validator";

export class DriversDTO implements Drivers {

    @Exclude()
    id: number;
    
    @MinLength(5)
    @MaxLength(30)
    name: string;

    @MinLength(5)
    @MaxLength(500)
    description: string;

    @MinLength(5)
    @MaxLength(10)
    car: string;

    @MaxLength(5)
    stars: number;

    @MinLength(4)
    tax: string;

    @MinLength(1)
    min_km: number;

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;
}