import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiMovedPermanentlyResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
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
  @ApiMovedPermanentlyResponse({ description: 'Model weights download.' })
  @ApiNotFoundResponse({ description: 'No such file or directory.' })
  async getNetwork(
    @Res() res: Response,
    @Param('path') path: string,
    @Query('type') type: string,
  ) {
    switch (type) {
      case 'metadata':
        return res.json(
          await this.neuralNetworksService.getModelMetadata(path),
        );
      case 'weights':
        return path.endsWith('/')
          ? res.json(await this.neuralNetworksService.listModelWeights(path))
          : res.redirect(
              await this.neuralNetworksService.getModelWeightsFile(path),
            );
      case 'model':
      default:
        return res.json(await this.neuralNetworksService.getModel(path));
    }
  }
}
