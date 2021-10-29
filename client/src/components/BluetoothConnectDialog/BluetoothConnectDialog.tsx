import { Container, Dialog, DialogTitle } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './BluetoothConnectDialog.module.scss';
import BluetoothDeviceSelection from '../BluetoothDeviceSelection/BluetoothDeviceSelection';
import UnsupportedPlatform from '../UnsupportedPlatform/UnsupportedPlatform';

interface BluetoothConnectDialogProps {
  open: boolean;
  onClose: (device: BluetoothDevice) => void;
}

const BluetoothConnectDialog: FC<BluetoothConnectDialogProps> = (
  props: BluetoothConnectDialogProps,
) => {
  const { onClose, open } = props;
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);

  useEffect(() => {
    if (navigator.bluetooth) {
      navigator.bluetooth
        .getAvailability()
        .then((isAvailable) => setSupportsBluetooth(isAvailable))
        .catch(() => setSupportsBluetooth(false));
    }
  }, []);

  const handleClose = (device: BluetoothDevice) => {
    onClose(device);
  };

  return (
    <Container
      className={styles.BluetoothConnectDialog}
      data-testid="BluetoothConnectDialog"
    >
      <Dialog fullWidth={true} onClose={handleClose} open={open}>
        <DialogTitle>Connect to headset</DialogTitle>
        {supportsBluetooth ? (
          <BluetoothDeviceSelection handleDeviceClick={handleClose} />
        ) : (
          <UnsupportedPlatform />
        )}
      </Dialog>
    </Container>
  );
};

export default BluetoothConnectDialog;
