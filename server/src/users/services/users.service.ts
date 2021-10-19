import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    return await this.userRepository.findOne({ id });
  }

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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userDetails.password, salt);
    return await this.userRepository.save({ ...userDetails, password: hash });
  }

  async verifyPassword(username: string, password: string) {
    const userFromDatabase = await this.findByUsername(username);
    return bcrypt.compare(password, userFromDatabase.password);
  }
}
