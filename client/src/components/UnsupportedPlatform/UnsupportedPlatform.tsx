import { Container, Typography } from '@mui/material';
import React, { FC } from 'react';
import styles from './UnsupportedPlatform.module.scss';

const UnsupportedPlatform: FC<{}> = () => {
  return (
    <Container
      className={styles.UnsupportedPlatform}
      data-testid="UnsupportedPlatform"
    >
      <Typography textAlign="center">
        Sadly, the platform you are running this application on is currently
        unsupported.
      </Typography>
    </Container>
  );
};

export default UnsupportedPlatform;
