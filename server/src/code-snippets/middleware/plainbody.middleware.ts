import * as rawBody from 'raw-body';

import {
  BadRequestException,
  ExecutionContext,
  UnsupportedMediaTypeException,
  createParamDecorator,
} from '@nestjs/common';

import { Request } from 'express';

export const PlainBody = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.is('text/plain')) {
      throw new UnsupportedMediaTypeException();
    }

    if (!req.readable) {
      throw new BadRequestException();
    }

    return (await rawBody(req)).toString('utf8').trim();
  },
);
