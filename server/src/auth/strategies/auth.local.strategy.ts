import { Injectable, UnauthorizedException } from '@nestjs/common';

import AuthError from '../errors/auth.error';
import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const userDetails = { username, password };
    try {
      const user = await this.authService.validateUser(userDetails);
      return user;
    } catch (ex) {
      if (ex instanceof AuthError) {
        throw new UnauthorizedException(ex.message);
      }
    }
  }
}
