import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/models/user.model';

type Done = (err: Error, user: User) => void;

@Injectable()
export class SessionSerializerUtil extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Done) {
    const userFromDB = await this.authService.validateUser(user);
    return userFromDB ? done(null, userFromDB) : done(null, null);
  }
}
