import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { NeuralNetworksService } from '../service/neural-networks.service';

@Controller('/neural-networks')
export class NeuralNetworksController {
  constructor(private readonly neuralNetworksService: NeuralNetworksService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of neural network models on the server.',
  })
  @ApiNotFoundResponse({ description: 'No such file or directory.' })
  async listNetworks() {
    return await this.neuralNetworksService.listModels();
  }

  @Get(':path(*)')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Neural network model or its metadata in JSON.',
  })
  @ApiNotFoundResponse({ description: 'No such file or directory.' })
  async getNetwork(
    @Param('path') path: string,
    @Query('metadata', new ParseBoolPipe()) metadata: boolean,
  ) {
    return metadata
      ? await this.neuralNetworksService.getModelMetadata(path)
      : await this.neuralNetworksService.getModel(path);
  }
}
