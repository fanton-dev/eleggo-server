import { Module } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { CodeSnippetsController } from './controllers/code-snippets.controller';
import { CodeSnippetsService } from './services/code-snippets.service';

@Module({
  imports: [AwsSdkModule.forFeatures([S3])],
  controllers: [CodeSnippetsController],
  providers: [CodeSnippetsService],
})
export class CodeSnippetsModule {}
