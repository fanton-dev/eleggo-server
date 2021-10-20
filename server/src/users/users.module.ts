import { AwsSdkModule } from 'nest-aws-sdk';
import { CodeSnippetsService } from 'src/code-snippets/services/code-snippets.service';
import { Module } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  providers: [UsersService, CodeSnippetsService],
  imports: [TypeOrmModule.forFeature([User]), AwsSdkModule.forFeatures([S3])],
})
export class UsersModule {}
