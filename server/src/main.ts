import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Session } from './auth/entities/session.entity';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeormStore } from 'connect-typeorm/out';
import { ValidationPipe } from '@nestjs/common';
import { configObject } from './configuration';
import { getRepository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);
  const allowedOrigins = [
    `${configObject.app.domain}:${configObject.app.port}`,
    configObject.client.root,
  ];

  app.enableCors({
    credentials: true,
    origin: allowedOrigins,
  });
  app.use(
    session({
      ...configObject.session,
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix(configObject.app.prefix);
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup(
    configObject.app.prefix,
    app,
    SwaggerModule.createDocument(app, configObject.swagger),
  );

  await app.listen(configObject.app.port);
}

bootstrap();
