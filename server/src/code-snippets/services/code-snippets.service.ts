import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { configObject } from 'src/configuration';

@Injectable()
export class CodeSnippetsService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async listUserCodeSnippets(username: string, subdirectory?: string) {
    const tree = {};
    const prefix = `${username}/${
      subdirectory
        ? subdirectory.endsWith('/')
          ? subdirectory
          : subdirectory + '/'
        : ''
    }`;
    const queryResponse = await this.s3
      .listObjectsV2({
        Bucket: configObject.aws.codeSnippetsS3Bucket,
        Prefix: prefix,
      })
      .promise();

    // The query response contains a list of strings describing the S3 file structure.
    // For example it may look something like this:
    // ['user/file0.py', 'user/dir1/', 'user/dir1/file1.py', 'user/dir1/file2.py'].
    //
    // First directory paths are filtered so the list looks like this:
    // ['user/file0.py', 'user/dir1/file1.py', 'user/dir1/file2.py'].
    //
    // Afterwards every string is iterated and split using '/' as a delimiter. The
    // username is also removed.This produces the following:
    // 'user/dir1/file1.py' -> ['dir1', 'file1.py'].
    //
    // Each such array is being iterated over a recursive function which keeps nesting
    // items (strings from the array) until the last one is reached.
    queryResponse.Contents.filter((item) => !item.Key.endsWith('/'))
      .map((item) => item.Key.replace(prefix, '').split('/'))
      .forEach((item) => this.addToFileTree(tree, item));

    return tree;
  }

  async saveUserCodeSnippet(username: string, filepath: string, body: string) {
    const completeFilepath = `${username}/${filepath}`;

    await this.s3
      .upload({
        Bucket: configObject.aws.codeSnippetsS3Bucket,
        Key: completeFilepath,
        Body: body,
      })
      .promise();
  }

  private addToFileTree(tree: any, item: string[]) {
    // If last item => file not directory
    if (item.length === 1) {
      return (tree[item[0]] = 'file');
    }

    // If directory => create empty object if it doesn't already exist and run again
    return this.addToFileTree((tree[item.shift()] ??= {}), item);
  }
}
