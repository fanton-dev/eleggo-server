import React, { FC, useContext } from 'react';
import { Button, Container } from '@mui/material';
import styles from './RecordingOptions.module.scss';
import { FiberManualRecord, Stop } from '@mui/icons-material';
import { HeadsetContext } from '../../contexts/HeadsetContext';

const RecordingOptions: FC<{}> = () => {
  const { headset, isRecording, startRecording, stopRecording } =
    useContext(HeadsetContext);
  return (
    <Container
      className={styles.RecordingOptions}
      data-testid="RecordingOptions"
    >
      {!isRecording ? (
        <Button
          disabled={!headset}
          variant="outlined"
          onClick={() => startRecording()}
        >
          <FiberManualRecord /> Record
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => stopRecording()}>
          <Stop /> Stop
        </Button>
      )}
    </Container>
  );
};

export default RecordingOptions;
