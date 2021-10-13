import { Profile, Strategy } from 'passport-github2';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsernameUtil } from '../utils/auth.username.util';
import { configObject } from 'src/configuration';

@Injectable()
export class AuthGithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usernameUtil: UsernameUtil,
  ) {
    super(configObject.github);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const {
      username: githubUsername,
      id: githubId,
      displayName: name,
      photos,
    } = profile;

    // As github usernames are not ensured to be unique, random characters are added.
    const username = this.usernameUtil.addRandomSequence(githubUsername);

    const avatar = photos[0].value;
    const userDetails = { username, githubId, name, avatar };

    const user = this.authService.validateUser(userDetails);
    done(null, user);
  }
}
