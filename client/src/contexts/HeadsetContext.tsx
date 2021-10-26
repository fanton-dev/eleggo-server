import React, { createContext, FC, useEffect, useState } from 'react';
import { HeadsetRecordingWorkerResponse } from '../workers/headset-recording-worker';

interface HeadsetContextExports {
  headset: BluetoothDevice | undefined;
  setHeadset: (headset: BluetoothDevice | undefined) => void;
  headsetData: number[][];
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

export const HeadsetContext = createContext<HeadsetContextExports>({
  headset: undefined,
  setHeadset: () => {},
  headsetData: Array(8).fill(Array(60).fill(0)),
  isRecording: false,
  startRecording: () => {},
  stopRecording: () => {},
});

const headsetRecordingWorker = new Worker(
  '../workers/headset-recording-worker.ts',
  {
    type: 'module',
  },
);

const HeadsetProvider: FC<{}> = ({ children }) => {
  const [headset, setHeadset] = useState<BluetoothDevice | undefined>(
    undefined,
  );
  const [headsetData, setHeadsetData] = useState<number[][]>(
    Array(8).fill(Array(60).fill(0)),
  );
  const [isRecording, setIsRecording] = useState(false);
  const [headsetReadingTask, setHeadsetReadingTask] = useState<
    NodeJS.Timer | undefined
  >(undefined);

  useEffect(() => {
    if (headset) {
      setHeadsetReadingTask(
        setInterval(async () => {
          // TODO: replace with actual headset data reading
          const reading = Array(8).fill(Array(60).fill(headsetData[0][0] + 1));

          setHeadsetData(reading);
          headsetRecordingWorker.postMessage({
            eventType: 'data',
            headsetData,
          });
        }, 8),
      );
    } else {
      stopRecording();
      headsetReadingTask && clearInterval(headsetReadingTask);
    }
  }, [headset]);

  const startRecording = () => {
    if (!headset) {
      return;
    }
    setIsRecording(true);
    headsetRecordingWorker.postMessage({
      eventType: 'start',
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    headsetRecordingWorker.postMessage({
      eventType: 'stop',
    });
  };

  headsetRecordingWorker.onmessage = (
    event: MessageEvent<HeadsetRecordingWorkerResponse>,
  ) => {
    // TODO: Post recording to the backend
    console.log(event.data.headsetRecording);
  };

  return (
    <HeadsetContext.Provider
      value={{
        headset,
        setHeadset,
        headsetData,
        isRecording,
        startRecording,
        stopRecording,
      }}
    >
      {children}
    </HeadsetContext.Provider>
  );
};

export default HeadsetProvider;
