import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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

  @Get('/')
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'List of user recordings.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async getAll(@Req() req: Request) {
    return this.recordingsService.listUserRecordings(req.user['username']);
  }
}
