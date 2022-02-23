import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styles from './ComponentTitle.module.scss';

const ComponentTitle: FC<{}> = ({ children }) => (
  <div className={styles.ComponentTitle} data-testid="ComponentTitle">
    <Typography>{children}</Typography>
  </div>
);

export default ComponentTitle;
