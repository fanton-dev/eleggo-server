import { AuthService } from '../services/auth.service';
import { IUser } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

type Done = (err: Error, user: IUser) => void;

@Injectable()
export class SessionSerializerUtil extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: IUser, done: Done) {
    done(null, { id: user.id });
  }

  async deserializeUser(user: IUser, done: Done) {
    const userFromDB = await this.authService.findUser(user);
    return userFromDB ? done(null, userFromDB) : done(null, null);
  }
}
