import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IUser } from 'src/users/models/user.model';
import { AuthDiscordGuard } from '../guards/auth.discord.guard';
import { AuthGithubGuard } from '../guards/auth.github.guard';
import { AuthGoogleGuard } from '../guards/auth.google.guard';
import { AuthLocalGuard } from '../guards/auth.local.guard';
import { AuthSessionGuard } from '../guards/auth.session.guard';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(AuthGoogleGuard)
  getGoogleLogin(@Res() res: Response) {
    res.sendStatus(HttpStatus.OK);
    return;
  }

  @Get('/status')
  @UseGuards(AuthSessionGuard)
  getStatus(@Req() req: Request) {
    return req.user;
  }

  @Get('/logout')
  @UseGuards(AuthSessionGuard)
  getLogout(@Req() req: Request) {
    req.logOut();
  }
}
