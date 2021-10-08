import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport-google-oauth20';
import { UsernameUtil } from '../utils/auth.username.util';
import { configObject } from 'src/configuration';

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usernameUtil: UsernameUtil,
  ) {
    super(configObject.google);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const {
      id: googleId,
      username: googleUsername,
      displayName: name,
      emails,
      photos,
    } = profile;

    const email = emails ? emails[0].value : undefined;
    const avatar = photos[0].value;

    // As google usernames are not ensured to be unique, random characters are added.
    const username = email
      ? this.usernameUtil.addRandomSequence(
          email.substring(0, email.indexOf('@')),
        )
      : this.usernameUtil.addRandomSequence(googleUsername);

    const userDetails = { username, googleId, name, email, avatar };
    const user = this.authService.validateUser(userDetails);
    done(null, user);
  }
}
