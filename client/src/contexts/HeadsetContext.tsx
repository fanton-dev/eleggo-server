import React, { createContext, FC, useEffect, useState } from 'react';

export const HeadsetContext = createContext({});
const headsetReadWorker = new Worker('../workers/headset-read-worker.ts', {
  type: 'module',
});

const HeadsetProvider: FC<{}> = ({ children }) => {
  const [headset, setHeadset] = useState<BluetoothDevice | undefined>(
    undefined,
  );
  const [headsetData, setHeadsetData] = useState<number[][]>([]);

  useEffect(() => {
    headset
      ? headsetReadWorker.postMessage({ headset })
      : headsetReadWorker.terminate();
  }, [headset]);

  headsetReadWorker.onmessage = (event) => {
    setHeadsetData(event.data);
  };

  return (
    <HeadsetContext.Provider value={{ headset, setHeadset, headsetData }}>
      {children}
    </HeadsetContext.Provider>
  );
};

export default HeadsetProvider;
