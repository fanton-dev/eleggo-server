import AuthError from '../errors/auth.error';
import { IUser } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(userDetails: IUser) {
    const user = await this.findUser(userDetails);
    const isLocalUser = userDetails.username && userDetails.password;

    if (!user) {
      if (isLocalUser) {
        throw new AuthError('Invalid login credentials.');
      }
      return await this.createUser(userDetails);
    }

    if (
      isLocalUser &&
      !(await this.usersService.verifyPassword(
        userDetails.username,
        userDetails.password,
      ))
    ) {
      throw new AuthError('Invalid login credentials.');
    }

    return user;
  }

  async createUser(userDetails: IUser) {
    const { username, email } = userDetails;
    if (
      (await this.findUser({ username })) ||
      (await this.findUser({ email }))
    ) {
      throw new AuthError('User already exists.');
    }
    return await this.usersService.createUser(userDetails);
  }

  async findUser(userDetails: IUser) {
    if (userDetails.id) {
      return await this.usersService.findById(userDetails.id);
    }

    if (userDetails.email) {
      return await this.usersService.findByEmail(userDetails.email);
    }

    if (userDetails.googleId) {
      return await this.usersService.findByGoogleId(userDetails.googleId);
    }

    if (userDetails.discordId) {
      return await this.usersService.findByDiscordId(userDetails.discordId);
    }

    if (userDetails.githubId) {
      return await this.usersService.findByGithubId(userDetails.githubId);
    }

    if (userDetails.username) {
      return await this.usersService.findByUsername(userDetails.username);
    }
  }
}
