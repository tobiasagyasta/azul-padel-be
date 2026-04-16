import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPort, validateRuntimeEnv } from './env';
import { validationPipeOptions } from './validation/validation-pipe-options';

async function bootstrap() {
  validateRuntimeEnv();
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  await app.listen(getPort());
}
bootstrap();
