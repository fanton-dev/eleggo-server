import AuthError from '../errors/auth.error';
import { IUser } from 'src/users/models/user.model';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

export type AccountType = 'local' | 'google' | 'discord' | 'github';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(userDetails: IUser) {
    let accountType: AccountType;
    userDetails.username && userDetails.password && (accountType = 'local');
    userDetails.googleId && (accountType = 'google');
    userDetails.googleId && (accountType = 'discord');
    userDetails.googleId && (accountType = 'github');

    const user = await this.findUser(userDetails, accountType);
    if (!user) {
      if (accountType === 'local') {
        throw new AuthError('User does not exist.');
      }
      return this.createUser(userDetails, accountType);
    }

    return user;
  }

  async createUser(userDetails: IUser, accountType: AccountType) {
    if (await this.findUser(userDetails, accountType)) {
      throw new AuthError('User already exists.');
    }
    return await this.usersService.createUser(userDetails);
  }

  async findUser(userDetails: IUser, accountType: AccountType) {
    switch (accountType) {
      case 'local':
        return (
          (await this.usersService.findByUsername(userDetails.username)) ??
          (await this.usersService.findByEmail(userDetails.email))
        );
      case 'google':
        return await this.usersService.findByGoogleId(userDetails.googleId);
      case 'discord':
        return await this.usersService.findByDiscordId(userDetails.discordId);
      case 'github':
        return await this.usersService.findByGithubId(userDetails.githubId);
    }
  }
}
