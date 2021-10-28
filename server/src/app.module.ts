import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { CodeSnippetsController } from './code-snippets/controllers/code-snippets.controller';
import { CodeSnippetsModule } from './code-snippets/code-snippets.module';
import { CodeSnippetsService } from './code-snippets/services/code-snippets.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RecordingsController } from './recordings/controllers/recordings.controller';
import { RecordingsModule } from './recordings/recordings.module';
import { RecordingsService } from './recordings/services/recordings.service';
import { S3 } from 'aws-sdk';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/controllers/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/services/users.service';
import { NeuralNetworksModule } from './neural-networks/neural-networks.module';
import { NeuralNetworksController } from './neural-networks/controllers/neural-networks.controller';
import { NeuralNetworksService } from './neural-networks/service/neural-networks.service';
import { configuration } from './configuration';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CodeSnippetsModule,
    RecordingsModule,
    NeuralNetworksModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => configService.get('aws'),
      },
    }),
    AwsSdkModule.forFeatures([S3]),
  ],
  controllers: [
    UsersController,
    AuthController,
    CodeSnippetsController,
    RecordingsController,
    NeuralNetworksController,
  ],
  providers: [
    UsersService,
    AuthService,
    CodeSnippetsService,
    RecordingsService,
    NeuralNetworksService,
  ],
})
export class AppModule {}
