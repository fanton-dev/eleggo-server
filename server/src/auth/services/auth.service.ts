import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/models/user.model';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(userDetails: IUser) {
    if (userDetails.username && userDetails.password) {
      const user = await this.usersService.findByUsername(userDetails.username);
      if (user) return user;
      return null;
    }

    if (userDetails.googleId) {
      const user = await this.usersService.findByGoogleId(userDetails.googleId);
      if (user) return user;
      return this.usersService.createUser(userDetails);
    }

    if (userDetails.discordId) {
      const user = await this.usersService.findByDiscordId(
        userDetails.discordId,
      );
      if (user) return user;
      return this.usersService.createUser(userDetails);
    }

    if (userDetails.githubId) {
      const user = await this.usersService.findByGithubId(userDetails.githubId);
      if (user) return user;
      return this.usersService.createUser(userDetails);
    }
  }

  createUser(userDetails: IUser) {
    this.usersService.createUser(userDetails);
  }

  findUser(
    identifier: string,
    type: 'local' | 'google' | 'discord' | 'github',
  ) {
    switch (type) {
      case 'local':
        return this.usersService.findByUsername(identifier);
      case 'google':
        return this.usersService.findByGoogleId(identifier);
      case 'discord':
        return this.usersService.findByDiscordId(identifier);
      case 'github':
        return this.usersService.findByGithubId(identifier);
    }
  }
}
