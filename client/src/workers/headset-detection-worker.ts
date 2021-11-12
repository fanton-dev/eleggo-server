import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

let isDetecting = false;
let previousHeadsetData: number[][];
let currentHeadsetData: number[][];

export interface HeadsetDetectionWorkerRequest {
  eventType: 'data' | 'start' | 'stop';
  modelName: string;
  headsetData: number[][];
}

export interface HeadsetDetectionWorkerResponse {
  detection: string;
}

export interface NeuralNetworkMetadata {
  name: string;
  outputs: string[];
}

addEventListener(
  'message',
  async (event: MessageEvent<HeadsetDetectionWorkerRequest>) => {
    const { eventType, modelName, headsetData } = event.data;

    switch (eventType) {
      case 'data':
        if (isDetecting) {
          previousHeadsetData = currentHeadsetData;
          currentHeadsetData = headsetData;
        }
        break;

      case 'start':
        isDetecting = true;
        const model = await tf.loadLayersModel(
          `${process.env.REACT_APP_API_ROOT}/neural-networks/models/${modelName}.json`,
          {
            weightPathPrefix: `${process.env.REACT_APP_API_ROOT}/neural-networks/weights/${modelName}/`,
          },
        );
        const modelMetadataResponse = await axios.get<NeuralNetworkMetadata>(
          `${process.env.REACT_APP_API_ROOT}/neural-networks/metadata/${modelName}.json`,
        );
        const modelMetadata = modelMetadataResponse.data;

        while (isDetecting) {
          // Ensuring the model is not iterating over stale headset data
          if (
            // previousHeadsetData !== currentHeadsetData ||
            !currentHeadsetData
          ) {
            continue;
          }

          // Getting detection from neural network
          const detectionTensor: any = model.predict([
            tf.tensor3d([currentHeadsetData]),
          ]);
          const detectionId: any = await detectionTensor.argMax(1).array();
          const detection = modelMetadata.outputs[detectionId];

          // Notifying the main thread so the Discord RPC updates and the local runner executes
          console.log(detection);
          postMessage({ detection });
        }
        break;

      case 'stop':
        isDetecting = false;
        break;
    }
  },
);
