import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import {
  DriversRepository,
  CustomersRepository,
  RidesRepository,
  ReviewsRepository,
} from 'src/shared/repository';
import { RideModule } from 'src/providers/http/ride/ride.module';
import { Logger } from '@nestjs/common';
import { config } from 'src/shared/config/env';
import { GoogleMaps } from 'src/shared/libs/google-maps';

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
