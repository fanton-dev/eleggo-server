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

  @Get('/models/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of neural network models on the server.',
  })
  @ApiNotFoundResponse({ description: 'No such file or directory.' })
  async listNetworks() {
    return await this.neuralNetworksService.listModels();
  }

  @Get('/models/:path(*)')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Neural network model architecture in JSON.',
  })
  @ApiNotFoundResponse({ description: 'No such file or directory.' })
  async getNetworkModel(@Res() res: Response, @Param('path') path: string) {
    return res.json(await this.neuralNetworksService.getModel(path));
  }

  @Get('/metadata/:path(*)')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Neural network metadata in JSON.',
  })
  @ApiNotFoundResponse({ description: 'No such file or directory.' })
  async getNetworkMetadata(@Res() res: Response, @Param('path') path: string) {
    return res.json(await this.neuralNetworksService.getModelMetadata(path));
  }

  @Get('/weights/:path(*)')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Neural network weights list.',
  })
  @ApiMovedPermanentlyResponse({ description: 'Model weights download.' })
  async getNetworkWeights(@Res() res: Response, @Param('path') path: string) {
    return path.endsWith('/')
      ? res.json(await this.neuralNetworksService.listModelWeights(path))
      : res.redirect(
          await this.neuralNetworksService.getModelWeightsFile(path),
        );
  }
}
