import React, { FC, useContext } from 'react';
import { Button, Container } from '@mui/material';
import styles from './BluetoothConnectionOptions.module.scss';
import { BluetoothSearching, BluetoothDisabled } from '@mui/icons-material';
import BluetoothConnectDialog from '../BluetoothConnectDialog/BluetoothConnectDialog';
import { HeadsetContext } from '../../contexts/HeadsetContext';

const BluetoothConnectionOptions: FC<{}> = () => {
  const { headset, setHeadset } = useContext(HeadsetContext);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (device: BluetoothDevice) => {
    setOpen(false);
    connectDevice(device);
  };

  const connectDevice = (device: BluetoothDevice) => {
    setHeadset(device);
  };

  const disconnectDevice = () => {
    setHeadset(undefined);
  };

  return (
    <Container
      className={styles.BluetoothConnectionOptions}
      data-testid="BluetoothConnectionOptions"
    >
      {!headset ? (
        <Button variant="outlined" onClick={handleOpen}>
          <BluetoothSearching /> Connect
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => disconnectDevice()}>
          <BluetoothDisabled /> Disconnect
        </Button>
      )}
      <BluetoothConnectDialog open={open} onClose={handleClose} />
    </Container>
  );
};

export default BluetoothConnectionOptions;
