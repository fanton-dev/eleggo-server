import React, { createContext, FC, useEffect, useState } from 'react';
import isElectron from 'is-electron';
import { HeadsetRecordingWorkerResponse } from '../workers/headset-recording-worker';
import { HeadsetDetectionWorkerResponse } from '../workers/headset-detection-worker';

interface HeadsetContextExports {
  headset: BluetoothDevice | undefined;
  setHeadset: (headset: BluetoothDevice | undefined) => void;
  headsetData: number[][];
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  isDetecting: boolean;
  startDetecting: (modelName: string, snippets: string[]) => void;
  stopDetecting: () => void;
}

export const HeadsetContext = createContext<HeadsetContextExports>({
  headset: undefined,
  setHeadset: () => {},
  headsetData: Array(8).fill(Array(60).fill(0)),
  isRecording: false,
  startRecording: () => {},
  stopRecording: () => {},
  isDetecting: false,
  startDetecting: (modelName, snippets) => {
    return { modelName, snippets };
  },
  stopDetecting: () => {},
});

const headsetRecordingWorker = new Worker(
  '../workers/headset-recording-worker.ts',
  {
    type: 'module',
  },
);

const headsetDetectionWorker = new Worker(
  '../workers/headset-detection-worker.ts',
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
  const [isDetecting, setIsDetecting] = useState(false);
  const [headsetReadingTask, setHeadsetReadingTask] = useState<
    NodeJS.Timer | undefined
  >(undefined);
  const [lastDetection, setLastDetection] = useState('');
  const [codeSnippets, setCodeSnippets] = useState<string[]>([]);

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
          headsetDetectionWorker.postMessage({
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

  const startDetecting = (modelName: string, snippets: string[]) => {
    setIsDetecting(true);
    setCodeSnippets(snippets);
    headsetDetectionWorker.postMessage({
      eventType: 'start',
      modelName,
    });
  };

  const stopDetecting = () => {
    setIsDetecting(false);
    headsetDetectionWorker.postMessage({
      eventType: 'stop',
    });
    window.api.send('toDiscordRPC', {
      state: 'Just exploring',
    });
  };

  headsetRecordingWorker.onmessage = (
    event: MessageEvent<HeadsetRecordingWorkerResponse>,
  ) => {
    // TODO: Post recording to the backend
    console.log(event.data.headsetRecording);
  };

  headsetDetectionWorker.onmessage = (
    event: MessageEvent<HeadsetDetectionWorkerResponse>,
  ) => {
    const { detectionId, detection } = event.data;

    if (isElectron()) {
      window.api.send('toCodeRunner', {
        code: codeSnippets[detectionId],
      });
    }

    if (isElectron() && lastDetection !== detection) {
      window.api.send('toDiscordRPC', {
        state: 'Thinking about',
        details: detection.toUpperCase(),
      });
    }

    setLastDetection(detection);
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
        isDetecting,
        startDetecting,
        stopDetecting,
      }}
    >
      {children}
    </HeadsetContext.Provider>
  );
};

export default HeadsetProvider;
