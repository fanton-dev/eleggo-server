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
  labels: string[];
}

addEventListener(
  'message',
  async (event: MessageEvent<HeadsetDetectionWorkerRequest>) => {
    const { eventType, modelName, headsetData } = event.data;

    switch (eventType) {
      case 'data':
        isDetecting &&
          (previousHeadsetData = currentHeadsetData) &&
          (currentHeadsetData = headsetData);
        break;

      case 'start':
        isDetecting = true;
        const model = await tf.loadLayersModel(
          `${process.env.REACT_APP_API_ROOT}/neural-networks/${modelName}`,
        );
        const modelMetadataResponse = await axios.get<NeuralNetworkMetadata>(
          `${process.env.REACT_APP_API_ROOT}/neural-networks/${modelName}?metadata=true`,
        );
        const modelMetadata = modelMetadataResponse.data;
        let previousDetection: string | undefined;

        while (isDetecting) {
          // Ensuring the model is not iterating over stale headset data
          if (previousHeadsetData !== currentHeadsetData) {
            continue;
          }

          // Getting detection from neural network
          const detectionTensor = model.predict(
            tf.tensor2d(currentHeadsetData),
          );
          const detectionId = parseInt(detectionTensor.toString());
          const detection = modelMetadata.labels[detectionId];

          // Sending current detection code snippet to local runner
          // TODO: implement this

          // Notifying the main thread so the Discord RPC updates
          previousDetection === detection && postMessage({ detection });
          previousDetection = detection;
        }
        break;

      case 'stop':
        isDetecting = false;
        break;
    }
  },
);
