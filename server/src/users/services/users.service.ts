import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findByUsername(username: string) {
    return await this.userRepo.findOne({ username });
  }

  async findByGoogleId(googleId: string) {
    return await this.userRepo.findOne({ googleId });
  }

  async findByDiscordId(discordId: string) {
    return await this.userRepo.findOne({ discordId });
  }

  async findByGithubId(githubId: string) {
    return await this.userRepo.findOne({ githubId });
  }

  async createUser(userDetails: IUser) {
    return await this.userRepo.save(userDetails);
  }
}
