import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { configObject } from 'src/configuration';
import NeuralNetworksError from '../errors/neural-networks.error';
import { NeuralNetworksErrorCode } from '../errors/neural-networks.error.codes';

@Injectable()
export class NeuralNetworksService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async listModels() {
    const queryResponse = await this.s3
      .listObjectsV2({
        Bucket: configObject.aws.neuralNetworksS3Bucket,
        Prefix: `models/`,
      })
      .promise();

    const result = queryResponse.Contents.filter(
      (item) => !item.Key.endsWith('/'),
    ).map((item) => item.Key.replace('models/', ''));

    return result;
  }

  async getModel(filepath: string) {
    const completeFilepath = `models/${filepath}`;

    if (completeFilepath.endsWith('/')) {
      throw new NeuralNetworksError(NeuralNetworksErrorCode.INVALID_FILE_PATH);
    }

    const queryResponse = await this.s3
      .getObject({
        Bucket: configObject.aws.neuralNetworksS3Bucket,
        Key: completeFilepath,
      })
      .promise();

    return JSON.parse(queryResponse.Body.toString());
  }

  async getModelMetadata(filepath: string) {
    const completeFilepath = `metadata/${filepath}`;

    if (completeFilepath.endsWith('/')) {
      throw new NeuralNetworksError(NeuralNetworksErrorCode.INVALID_FILE_PATH);
    }

    const queryResponse = await this.s3
      .getObject({
        Bucket: configObject.aws.neuralNetworksS3Bucket,
        Key: completeFilepath,
      })
      .promise();

    return JSON.parse(queryResponse.Body.toString());
  }
}
