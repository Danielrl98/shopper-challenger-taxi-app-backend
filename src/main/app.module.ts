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

const repositorys = [
  DriversRepository,
  CustomersRepository,
  RidesRepository,
  ReviewsRepository,
];

@Global()
@Module({
  providers: [Logger, ...repositorys],
  exports: [Logger, ...repositorys],
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
