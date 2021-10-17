import { AuthController } from './controllers/auth.controller';
import { AuthDiscordStrategy } from './strategies/auth.discord.strategy';
import { AuthGithubStrategy } from './strategies/auth.github.strategy';
import { AuthGoogleStrategy } from './strategies/auth.google.strategy';
import { AuthLocalStrategy } from './strategies/auth.local.strategy';
import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { SessionSerializerUtil } from './utils/auth.serializer.util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.model';
import { UsernameUtil } from './utils/auth.username.util';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [
    AuthLocalStrategy,
    AuthGoogleStrategy,
    AuthDiscordStrategy,
    AuthGithubStrategy,
    SessionSerializerUtil,
    UsernameUtil,
    AuthService,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}