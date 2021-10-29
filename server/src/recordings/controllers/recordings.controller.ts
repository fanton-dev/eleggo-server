import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthSessionGuard } from 'src/auth/guards/auth.session.guard';
import { RecordingsService } from '../services/recordings.service';

@Controller('/recordings')
export class RecordingsController {
  constructor(private readonly recordingsService: RecordingsService) {}

  @Get(':path(*)')
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiOkResponse({
    description:
      'List of user recordings or the contents of a recording specified.',
  })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async getAll(@Req() req: Request, @Param('path') path: string) {
    path ??= '';

    return path.endsWith('/') || path === ''
      ? await this.recordingsService.listRecordings(req.user['username'])
      : await this.recordingsService.getRecording(req.user['username'], path);
  }
}
