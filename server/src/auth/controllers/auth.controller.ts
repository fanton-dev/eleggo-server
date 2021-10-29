import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiMovedPermanentlyResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { configObject } from 'src/configuration';
import AuthError from '../errors/auth.error';
import { AuthErrorCode } from '../errors/auth.error.code';
import { AuthDiscordGuard } from '../guards/auth.discord.guard';
import { AuthGithubGuard } from '../guards/auth.github.guard';
import { AuthGoogleGuard } from '../guards/auth.google.guard';
import { AuthLocalGuard } from '../guards/auth.local.guard';
import { AuthSessionGuard } from '../guards/auth.session.guard';
import { LoginModel } from '../models/auth.login.model';
import { RegisterModel } from '../models/auth.register.model';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthLocalGuard)
  @ApiBody({ type: LoginModel })
  @ApiOkResponse({ description: 'User logged in.' })
  @ApiUnauthorizedResponse({ description: 'Invalid user credentials.' })
  getLocalLogin(@Res() res: Response) {
    res.sendStatus(HttpStatus.OK);
    return;
  }

  @Post('/register')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBody({ type: RegisterModel })
  @ApiCreatedResponse({ description: 'User registered.' })
  @ApiConflictResponse({ description: 'User already exists.' })
  async getLocalRegister(@Body() user: RegisterModel) {
    try {
      return { id: (await this.authService.createUser(user)).id };
    } catch (ex) {
      if (
        ex instanceof AuthError &&
        ex.message === AuthErrorCode.INVALID_LOGIN_CREDENTIALS
      ) {
        throw new ConflictException(ex.message);
      }
    }
  }

  @Get('/login/google')
  @HttpCode(HttpStatus.OK)
  @Redirect(configObject.client.root, HttpStatus.MOVED_PERMANENTLY)
  @UseGuards(AuthGoogleGuard)
  @ApiOkResponse({ description: 'Google OAuth screen.' })
  @ApiMovedPermanentlyResponse({ description: 'User logged in.' })
  getGoogleLogin() {
    return 'OK';
  }

  @Get('/login/discord')
  @HttpCode(HttpStatus.OK)
  @Redirect(configObject.client.root, HttpStatus.MOVED_PERMANENTLY)
  @UseGuards(AuthDiscordGuard)
  @ApiOkResponse({ description: 'Discord OAuth screen.' })
  @ApiMovedPermanentlyResponse({ description: 'User logged in.' })
  getDiscordLogin() {
    return 'OK';
  }

  @Get('/login/github')
  @HttpCode(HttpStatus.OK)
  @Redirect(configObject.client.root, HttpStatus.MOVED_PERMANENTLY)
  @UseGuards(AuthGithubGuard)
  @ApiOkResponse({ description: 'GitHub OAuth screen.' })
  @ApiMovedPermanentlyResponse({ description: 'User logged in.' })
  getGithubLogin() {
    return 'OK';
  }

  @Get('/status')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'User logged in.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  getStatus() {
    return 'OK';
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'User logged out.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  getLogout(@Req() req: Request) {
    req.logOut();
    return 'OK';
  }
}
