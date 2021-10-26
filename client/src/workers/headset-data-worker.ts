let isRecording = false;
const headsetRecording: number[][][] = [];

export interface HeadsetDataWorkerRequest {
  eventType: 'data' | 'record-start' | 'record-stop';
  headsetData?: number[][];
}

export interface HeadsetDataWorkerResponse {
  headsetRecording: number[][][];
}

addEventListener('message', (event: MessageEvent<HeadsetDataWorkerRequest>) => {
  const { eventType, headsetData } = event.data;
  console.log({ eventType, headsetData });

  switch (eventType) {
    case 'data':
      isRecording && headsetData && headsetRecording.push(headsetData);
      break;

    case 'record-start':
      isRecording = true;
      break;

    case 'record-stop':
      isRecording = false;
      postMessage({ headsetRecording });
      break;
  }
});
