import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { configObject } from 'src/configuration';
import RecordingsError from '../errors/recordings.error';
import { RecordingsErrorCode } from '../errors/recordings.error.code';

@Injectable()
export class RecordingsService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async listRecordings(username: string) {
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

  async getRecording(username: string, filepath: string) {
    const completeFilepath = `${username}/${filepath}`;

    if (completeFilepath.endsWith('/')) {
      throw new RecordingsError(RecordingsErrorCode.INVALID_FILE_PATH);
    }

    const queryResponse = await this.s3
      .getObject({
        Bucket: configObject.aws.recordingsS3Bucket,
        Key: completeFilepath,
      })
      .promise();

    return JSON.parse(queryResponse.Body.toString());
  }

  async saveRecording(path: string, body: any[]) {
    if (path.endsWith('/')) {
      throw new RecordingsError(RecordingsErrorCode.INVALID_FILE_PATH);
    }

    await this.s3
      .upload({
        Bucket: configObject.aws.codeSnippetsS3Bucket,
        Key: path,
        Body: body,
      })
      .promise();
  }
}
