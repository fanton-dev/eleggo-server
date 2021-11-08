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
  ApiAcceptedResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthSessionGuard } from 'src/auth/guards/auth.session.guard';
import RecordingsError from '../errors/recordings.error';
import { RecordingsErrorCode } from '../errors/recordings.error.code';
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

  @Put(':path(*)')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthSessionGuard)
  @ApiCookieAuth()
  @ApiAcceptedResponse({ description: 'Recording stored.' })
  @ApiForbiddenResponse({ description: 'No user logon.' })
  async putObject(@Param('path') path: string, @Body() body: any[]) {
    try {
      await this.recordingsService.saveRecording(path, body);
      return 'Accepted';
    } catch (ex) {
      if (
        ex instanceof RecordingsError &&
        ex.message === RecordingsErrorCode.INVALID_FILE_PATH
      ) {
        throw new BadRequestException(ex.message);
      }
    }
  }
}
