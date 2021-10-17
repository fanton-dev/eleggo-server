import { Test, TestingModule } from '@nestjs/testing';
import { CodeSnippetsService } from './code-snippets.service';

describe('CodeSnippetsService', () => {
  let service: CodeSnippetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeSnippetsService],
    }).compile();

    service = module.get<CodeSnippetsService>(CodeSnippetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
