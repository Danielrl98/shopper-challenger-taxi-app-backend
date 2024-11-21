import { Injectable, Controller, Logger } from '@nestjs/common';
import { IRides } from 'src/shared/entities';

@Injectable()
export class RideService {

    constructor(
        private readonly logger: Logger,
    ){ }
    estimate(ride: IRides){
        return ride
    }
}
