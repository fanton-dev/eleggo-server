import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/users/models/user.model';
import AuthError from '../errors/auth.error';
import { AuthDiscordGuard } from '../guards/auth.discord.guard';
import { AuthGithubGuard } from '../guards/auth.github.guard';
import { AuthGoogleGuard } from '../guards/auth.google.guard';
import { AuthLocalGuard } from '../guards/auth.local.guard';
import { AuthSessionGuard } from '../guards/auth.session.guard';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthLocalGuard)
  getLocalLogin(@Res() res: Response) {
    res.sendStatus(HttpStatus.OK);
    return;
  }

  @Post('/register')
  @HttpCode(HttpStatus.ACCEPTED)
  async getLocalRegister(@Body() user: User) {
    try {
      return { id: (await this.authService.createUser(user, 'local')).id };
    } catch (ex) {
      if (ex instanceof AuthError && ex.message === 'User already exists.') {
        throw new ConflictException(ex.message);
      }
    }
  }

  @Get('/login/google')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGoogleGuard)
  getGoogleLogin() {
    return 'OK';
  }

  @Get('/login/discord')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthDiscordGuard)
  getDiscordLogin() {
    return 'OK';
  }

  @Get('/login/github')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGithubGuard)
  getGithubLogin() {
    return 'OK';
  }

  @Get('/status')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSessionGuard)
  getStatus() {
    return 'OK';
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSessionGuard)
  getLogout(@Req() req: Request) {
    req.logOut();
    return 'OK';
  }
}
