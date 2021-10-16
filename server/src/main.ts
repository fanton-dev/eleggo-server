import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { configObject } from './configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session(configObject.session));
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
