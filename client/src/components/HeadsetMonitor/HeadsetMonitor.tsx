import { Container } from '@mui/material';
import React, { FC } from 'react';
import BluetoothConnectionOptions from '../BluetoothConnectionOptions/BluetoothConnectionOptions';
import styles from './HeadsetMonitor.module.scss';

const HeadsetMonitor: FC<{}> = () => {
  return (
    <Container className={styles.HeadsetMonitor} data-testid="HeadsetMonitor">
      <BluetoothConnectionOptions />
    </Container>
  );
};

export default HeadsetMonitor;
