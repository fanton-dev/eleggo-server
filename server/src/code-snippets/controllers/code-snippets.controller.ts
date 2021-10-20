import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthSessionGuard } from 'src/auth/guards/auth.session.guard';
import CodeSnippetsError from '../errors/code-snippets.error';
import { CodeSnippetsErrorCode } from '../errors/code-snippets.error.code';
import { PlainBody } from '../middleware/plainbody.middleware';
import { CodeSnippetsService } from '../services/code-snippets.service';

@Controller('/code-snippets')
export class CodeSnippetsController {
  constructor(private readonly codeSnippetsService: CodeSnippetsService) {}

  @Get(':path(*)')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiOkResponse({
    description:
      'Tree of user files in a directory or the contents of a file specified.',
  })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async getSubdirectory(@Req() req: Request, @Param('path') path: string) {
    path ??= '';

    return path.endsWith('/') || path === ''
      ? await this.codeSnippetsService.listUserCodeSnippets(
          req.user['username'],
          path,
        )
      : await this.codeSnippetsService.getUserCodeSnippet(
          req.user['username'],
          path,
        );
  }

  @Put(':filepath(*)')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'Tree of user files.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async putFile(
    @Req() req: Request,
    @Param('filepath') filepath: string,
    @PlainBody() body: string,
  ) {
    try {
      await this.codeSnippetsService.saveUserCodeSnippet(
        req.user['username'],
        filepath,
        body,
      );
      return 'OK';
    } catch (ex) {
      if (
        ex instanceof CodeSnippetsError &&
        ex.message === CodeSnippetsErrorCode.INVALID_FILE_PATH
      ) {
        throw new BadRequestException(ex.message);
      }
    }
  }
}
