import { Test, TestingModule } from '@nestjs/testing';
import {
  createAwsServiceMock,
  createAwsServicePromisableSpy,
  getAwsServiceMock,
} from 'nest-aws-sdk/dist/testing';

import { CodeSnippetsService } from './code-snippets.service';
import { S3 } from 'aws-sdk';
import { configObject } from 'src/configuration';

describe('CodeSnippetsService', () => {
  let service: CodeSnippetsService;
  let module: TestingModule;

  const mockS3 = {
    listObjectsV2: () => null,
  };
  const bucketName = configObject.aws.codeSnippetsS3Bucket;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        CodeSnippetsService,
        createAwsServiceMock(S3, {
          useValue: mockS3,
        }),
      ],
    }).compile();

    service = module.get<CodeSnippetsService>(CodeSnippetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listCodeSnippets', () => {
    it('should call listObjectsV2', () => {
      const listSpy = createAwsServicePromisableSpy(
        getAwsServiceMock(module, S3),
        'listObjectsV2',
        'resolve',
        {
          Contents: [{ Key: bucketName }],
        },
      );

      expect(listSpy).toHaveBeenCalledWith({ Bucket: bucketName });
      expect(mockS3.listObjectsV2).toBeCalledTimes(1);
    });
  });
});
