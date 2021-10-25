import React, { createContext, FC, useEffect, useState } from 'react';
import { HeadsetReadWorkerResponse } from '../workers/headset-read-worker';

interface HeadsetContextExports {
  headset: BluetoothDevice | undefined;
  setHeadset: (headset: BluetoothDevice) => void;
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

const headsetReadWorker = new Worker('../workers/headset-read-worker.ts', {
  type: 'module',
});

const HeadsetProvider: FC<{}> = ({ children }) => {
  const [headset, setHeadset] = useState<BluetoothDevice | undefined>(
    undefined,
  );
  const [headsetData, setHeadsetData] = useState<number[][]>(
    Array(8).fill(Array(60).fill(0)),
  );

  useEffect(() => {
    headset
      ? headsetReadWorker.postMessage({
          eventType: 'read',
          actionType: 'start',
          headset,
        })
      : headsetReadWorker.postMessage({
          eventType: 'read',
          actionType: 'stop',
        });
  }, [headset]);

  const startRecording = () => {
    headsetReadWorker.postMessage({
      eventType: 'record',
      actionType: 'start',
    });
  };

  const stopRecording = () => {
    headsetReadWorker.postMessage({
      eventType: 'record',
      actionType: 'stop',
    });
  };

  headsetReadWorker.onmessage = (
    event: MessageEvent<HeadsetReadWorkerResponse>,
  ) => {
    switch (event.data.eventType) {
      case 'read':
        setHeadsetData(event.data.headsetData);
        break;
      case 'record':
        // TODO: Post recording to the backend
        console.log(event.data.headsetRecording);
        break;
    }
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
