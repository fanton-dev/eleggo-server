import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    const userDetails = { username, password };
    const user = this.authService.validateUser(userDetails);
    return user;
  }
}
