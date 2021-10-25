let isReading = false;
let isRecording = false;
const headsetRecording: number[][][] = [];

export interface HeadsetReadWorkerRequest {
  eventType: 'read' | 'record';
  actionType: 'start' | 'end';
  headset?: BluetoothDevice;
}

export interface HeadsetReadWorkerResponse {
  eventType: 'read' | 'record';
  headsetData: number[][];
  headsetRecording: number[][][];
}

addEventListener('message', (event: MessageEvent<HeadsetReadWorkerRequest>) => {
  const { eventType, actionType, headset } = event.data;
  console.log({ eventType, actionType, headset });

  switch (eventType) {
    case 'read':
      switch (actionType) {
        case 'start':
          console.log('Connected to headset...');
          isReading = true;
          while (isReading) {
            // Replace with current data reading from bluetooth device
            console.log(headset);
            const headsetData = Array(8).fill(Array(60).fill(0));

            isRecording && headsetRecording.push(headsetData);
            postMessage({ eventType, headsetData });
            break;
          }
          break;
        case 'end':
          isReading = false;
          break;
      }
      break;

    case 'record':
      switch (actionType) {
        case 'start':
          isRecording = true;
          break;
        case 'end':
          isRecording = false;
          postMessage({ eventType, headsetRecording });
          break;
      }
      break;
  }
});
