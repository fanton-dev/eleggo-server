import { Module } from '@nestjs/common';
import { NeuralNetworksService } from './service/neural-networks.service';
import { NeuralNetworksController } from './controllers/neural-networks.controller';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Module({
  imports: [AwsSdkModule.forFeatures([S3])],
  providers: [NeuralNetworksService],
  controllers: [NeuralNetworksController],
})
export class NeuralNetworksModule {}
