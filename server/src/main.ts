import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Session } from './auth/models/session.model';
import { TypeormStore } from 'connect-typeorm/out';
import { ValidationPipe } from '@nestjs/common';
import { configObject } from './configuration';
import { getRepository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);

  app.use(
    session({
      ...configObject.session,
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
