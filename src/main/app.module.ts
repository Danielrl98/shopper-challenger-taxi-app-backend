import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import {
  DriversRepository,
  CustomersRepository,
  RidesRepository,
  ReviewsRepository,
} from '../shared/repository';
import { RideModule } from '../providers';
import { Logger } from '@nestjs/common';
import { config } from '../shared/config/env';
import { GoogleMaps } from '../shared/libs/google-maps';

const injetable = [
  DriversRepository,
  CustomersRepository,
  RidesRepository,
  ReviewsRepository,
  GoogleMaps,
  Logger,
];

@Global()
@Module({
  providers: injetable,
  exports: injetable,
})
class GlobalModules {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    GlobalModules,
    RideModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
