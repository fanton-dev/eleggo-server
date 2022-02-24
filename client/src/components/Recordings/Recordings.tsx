import React, { FC } from 'react';
import styles from './Recordings.module.scss';

const Recordings: FC<{}> = () => {
  return (
    <div className={styles.Recordings} data-testid="Recordings">
      Recordings Component
    </div>
  );
};

export default Recordings;
