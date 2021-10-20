import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { configObject } from 'src/configuration';

@Injectable()
export class RecordingsService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async listUserRecordings(username: string) {
    const queryResponse = await this.s3
      .listObjectsV2({
        Bucket: configObject.aws.recordingsS3Bucket,
        Prefix: `${username}/`,
      })
      .promise();

    const result = queryResponse.Contents.filter(
      (item) => !item.Key.endsWith('/'),
    ).map((item) => item.Key.replace(`${username}/`, ''));

    return result;
  }
}
