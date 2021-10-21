import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
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
  @ApiNotFoundResponse({ description: 'No such file or directory.' })
  async getObject(@Req() req: Request, @Param('path') path: string) {
    path ??= '';

    return path.endsWith('/') || path === ''
      ? await this.codeSnippetsService.listCodeSnippets(
          req.user['username'],
          path,
        )
      : await this.codeSnippetsService.getCodeSnippet(
          req.user['username'],
          path,
        );
  }

  @Put(':path(*)')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiAcceptedResponse({ description: 'File or directory created.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async putObject(
    @Req() req: Request,
    @Param('path') path: string,
    @PlainBody() body?: string,
  ) {
    try {
      path.endsWith('/') || path === ''
        ? await this.codeSnippetsService.createDirectory(
            req.user['username'],
            path,
          )
        : await this.codeSnippetsService.saveCodeSnippet(
            req.user['username'],
            path,
            body,
          );
      return 'Accepted';
    } catch (ex) {
      if (
        ex instanceof CodeSnippetsError &&
        ex.message === CodeSnippetsErrorCode.INVALID_FILE_PATH
      ) {
        throw new BadRequestException(ex.message);
      }
    }
  }

  @Delete(':path(*)')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiAcceptedResponse({ description: 'File or directory created.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async deleteObject(@Req() req: Request, @Param('path') path: string) {
    path.endsWith('/') || path === ''
      ? await this.codeSnippetsService.deleteDirectory(
          req.user['username'],
          path,
        )
      : await this.codeSnippetsService.deleteCodeSnippet(
          req.user['username'],
          path,
        );
    return 'OK';
  }
}
