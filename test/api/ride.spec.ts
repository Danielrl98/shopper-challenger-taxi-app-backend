import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/main/app.module';

describe('RideController test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/POST estimate, should return status 200', async () => {
    const result = request(app.getHttpServer())
      .post('/ride/estimate')
      .send({
        customer_id: 1,
        origin: 'rua narciso martins 35, barra do imbui',
        destination: 'av aimores, meudon - teresópolis',
      })
      .expect(200)
      .then(async (response) => {
        console.log(await response.body);
      });

    return result;
  });
  it('/PATCH confirm, should return status 200', async () => {
    const result = request(app.getHttpServer())
      .patch('/ride/confirm')
      .send({
        customer_id: 1,
        origin: 'rua narciso martins 35, barra do imbui',
        destination: 'av aimores, meudon - teresópolis',
        distance: 0.05,
        duration: '1h 20min',
        driver: {
          id: 3,
          name: 'James bond',
        },
        value: 5.5,
      })
      .expect(200)
      .then(async (response) => {
        console.log(await response.body);
      });

    return result;
  });

  it('/GET list rides, should return status 200', async () => {
    const result = request(app.getHttpServer())
      .get('/ride/2?=driver_id=2')
      .expect(200)

    return result;
  });
});
