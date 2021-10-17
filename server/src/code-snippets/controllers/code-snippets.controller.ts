import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthSessionGuard } from 'src/auth/guards/auth.session.guard';
import { CodeSnippetsService } from '../services/code-snippets.service';

@Controller('/code-snippets')
export class CodeSnippetsController {
  constructor(private readonly codeSnippetsService: CodeSnippetsService) {}

  @Get('/')
  @UseGuards(AuthSessionGuard)
  async getAll(@Req() req: Request) {
    return this.codeSnippetsService.listUserSnippets(req.user['username']);
  }
}
