import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthSessionGuard } from 'src/auth/guards/auth.session.guard';
import { CodeSnippetsService } from '../services/code-snippets.service';

@Controller('/code-snippets')
export class CodeSnippetsController {
  constructor(private readonly codeSnippetsService: CodeSnippetsService) {}

  @Get(':subdirectory(*)|/')
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'Tree of user files.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async getSubdirectory(
    @Req() req: Request,
    @Param('subdirectory') subdirectory: string,
  ) {
    return this.codeSnippetsService.listUserCodeSnippets(
      req.user['username'],
      subdirectory ?? '',
    );
  }
}
