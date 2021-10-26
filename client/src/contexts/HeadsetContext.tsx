import React, { createContext, FC, useEffect, useState } from 'react';
import { HeadsetDataWorkerResponse } from '../workers/headset-data-worker';

interface HeadsetContextExports {
  headset: BluetoothDevice | undefined;
  setHeadset: (headset: BluetoothDevice | undefined) => void;
  headsetData: number[][];
  startRecording: () => void;
  stopRecording: () => void;
}

export const HeadsetContext = createContext<HeadsetContextExports>({
  headset: undefined,
  setHeadset: () => {},
  headsetData: Array(8).fill(Array(60).fill(0)),
  startRecording: () => {},
  stopRecording: () => {},
});

const headsetDataWorker = new Worker('../workers/headset-data-worker.ts', {
  type: 'module',
});

const HeadsetProvider: FC<{}> = ({ children }) => {
  const [headset, setHeadset] = useState<BluetoothDevice | undefined>(
    undefined,
  );
  const [headsetData, setHeadsetData] = useState<number[][]>(
    Array(8).fill(Array(60).fill(0)),
  );
  const [headsetReadingTask, setHeadsetReadingTask] = useState<
    NodeJS.Timer | undefined
  >(undefined);

  useEffect(() => {
    headset
      ? setHeadsetReadingTask(
          setInterval(async () => {
            // TODO: replace with actual headset data reading
            const reading = Array(8).fill(
              Array(60).fill(headsetData[0][0] + 1),
            );

            setHeadsetData(reading);
            headsetDataWorker.postMessage({
              eventType: 'data',
              headsetData,
            });
          }, 8),
        )
      : headsetReadingTask && clearInterval(headsetReadingTask);
    console.log(headsetReadingTask);
  }, [headset]);

  const startRecording = () => {
    headsetDataWorker.postMessage({
      eventType: 'record-start',
    });
  };

  const stopRecording = () => {
    headsetDataWorker.postMessage({
      eventType: 'record-stop',
    });
  };

  headsetDataWorker.onmessage = (
    event: MessageEvent<HeadsetDataWorkerResponse>,
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
        startRecording,
        stopRecording,
      }}
    >
      {children}
    </HeadsetContext.Provider>
  );
};

export default HeadsetProvider;
