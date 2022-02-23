import React, { FC } from 'react';
import DetectionModelsList from '../DetectionModelsList/DetectionModelsList';
import DetectionOptions from '../DetectionOptions/DetectionOptions';
import styles from './HeadsetAutomation.module.scss';

const HeadsetAutomation: FC<{}> = ({}) => {
  return (
    <div className={styles.HeadsetAutomation} data-testid="HeadsetAutomation">
      <div className={styles.DetectionModelsList}>
        <DetectionModelsList />
      </div>
      <div className={styles.DetectionOptions}>
        <DetectionOptions model="thought_of_direction" />
      </div>
    </div>
  );
};

export default HeadsetAutomation;
