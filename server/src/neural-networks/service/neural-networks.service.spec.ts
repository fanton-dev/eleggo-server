import { Test, TestingModule } from '@nestjs/testing';
import { NeuralNetworksService } from './neural-networks.service';

describe('NeuralNetworksService', () => {
  let service: NeuralNetworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeuralNetworksService],
    }).compile();

    service = module.get<NeuralNetworksService>(NeuralNetworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
