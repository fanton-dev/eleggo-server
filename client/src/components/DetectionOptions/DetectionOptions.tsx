import React, { FC, useContext } from 'react';
import { Container, Switch, Typography } from '@mui/material';
import { HeadsetContext } from '../../contexts/HeadsetContext';
import Window from '../Window/Window';
import styles from './DetectionOptions.module.scss';

interface DetectionOptionsProps {
  model: string;
}

const DetectionOptions: FC<DetectionOptionsProps> = ({ model }) => {
  const { startDetecting, stopDetecting } = useContext(HeadsetContext);
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? startDetecting(model) : stopDetecting();
  };

  return (
    <div className={styles.DetectionOptions} data-testid="DetectionOptions">
      <Window title="Configuration Options">
        <div className={styles.ContainerBody}>
          <Container className={styles.Heading}>
            <Typography variant="h5">{model}</Typography>
            <Switch onChange={handleSwitchChange} />
          </Container>
        </div>
      </Window>
    </div>
  );
};

export default DetectionOptions;
