import { Test, TestingModule } from '@nestjs/testing';
import { NeuralNetworksController } from './neural-networks.controller';

describe('NeuralNetworksController', () => {
  let controller: NeuralNetworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeuralNetworksController],
    }).compile();

    controller = module.get<NeuralNetworksController>(NeuralNetworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
