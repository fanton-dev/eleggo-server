import { Test, TestingModule } from '@nestjs/testing';
import { CodeSnippetsController } from './code-snippets.controller';

describe('CodeSnippetsController', () => {
  let controller: CodeSnippetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeSnippetsController],
    }).compile();

    controller = module.get<CodeSnippetsController>(CodeSnippetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
