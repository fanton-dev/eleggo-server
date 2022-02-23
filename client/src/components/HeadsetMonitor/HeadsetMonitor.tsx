import React, { FC } from 'react';
import RecordingOptions from '../RecordingOptions/RecordingOptions';
import BluetoothConnectionOptions from '../BluetoothConnectionOptions/BluetoothConnectionOptions';
import styles from './HeadsetMonitor.module.scss';
import Window from '../Window/Window';

const HeadsetMonitor: FC<{}> = () => {
  return (
    <div className={styles.HeadsetMonitor} data-testid="HeadsetMonitor">
      <Window title="Headset Monitor">
        <div>
          <BluetoothConnectionOptions />
          <RecordingOptions />
        </div>
      </Window>
    </div>
  );
};

export default HeadsetMonitor;
