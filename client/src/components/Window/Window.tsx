import React, { FC } from 'react';
import { Typography } from '@mui/material';
import styles from './Window.module.scss';

interface WindowProps {
  title: string;
}

const Window: FC<WindowProps> = ({ title, children }) => {
  return (
    <div className={styles.Window} data-testid="Window">
      <div className={styles.Title} data-testid="ComponentTitle">
        <Typography>{title}</Typography>
      </div>
      {children}
    </div>
  );
};

export default Window;
