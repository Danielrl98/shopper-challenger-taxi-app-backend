import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from '../shared/common/validationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,Origin',
    credentials: true,
  });

  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(3000);
}
bootstrap();
