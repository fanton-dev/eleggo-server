import { Profile, Strategy } from 'passport-discord';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsernameUtil } from '../utils/auth.username.util';
import { configObject } from 'src/configuration';

@Injectable()
export class AuthDiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usernameUtil: UsernameUtil,
  ) {
    super(configObject.discord);
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username: discordUsername, id: discordId, avatar } = profile;

    // As discord usernames are not ensured to be unique, random characters are added.
    const username = this.usernameUtil.addRandomSequence(discordUsername);

    const userDetails = { username, discordId, avatar };
    return this.authService.validateUser(userDetails);
  }
}
