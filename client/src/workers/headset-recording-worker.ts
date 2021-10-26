let isRecording = false;
const headsetRecording: number[][][] = [];

export interface HeadsetRecordingWorkerRequest {
  eventType: 'data' | 'start' | 'stop';
  headsetData?: number[][];
}

export interface HeadsetRecordingWorkerResponse {
  headsetRecording: number[][][];
}

addEventListener(
  'message',
  (event: MessageEvent<HeadsetRecordingWorkerRequest>) => {
    const { eventType, headsetData } = event.data;

    switch (eventType) {
      case 'data':
        isRecording && headsetData && headsetRecording.push(headsetData);
        break;

      case 'start':
        isRecording = true;
        break;

      case 'stop':
        isRecording = false;
        postMessage({ headsetRecording });
        break;
    }
  },
);
