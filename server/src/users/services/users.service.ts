import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ username });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async findByGoogleId(googleId: string) {
    return await this.userRepository.findOne({ googleId });
  }

  async findByDiscordId(discordId: string) {
    return await this.userRepository.findOne({ discordId });
  }

  async findByGithubId(githubId: string) {
    return await this.userRepository.findOne({ githubId });
  }

  async createUser(userDetails: IUser) {
    return await this.userRepository.save(userDetails);
  }
}
