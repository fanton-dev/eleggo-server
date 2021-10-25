import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './BluetoothDeviceSelection.module.scss';
import { Bluetooth, Refresh } from '@mui/icons-material';

const BluetoothDeviceSelection: FC<{}> = () => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  const refreshDevices = async () => {
    const requestDeviceOptions = {
      acceptAllDevices: true,
    };

    // .getDevices() won't work unless this terribleness is done
    const firstFoundDevice = await navigator.bluetooth.requestDevice(
      requestDeviceOptions,
    );
    let currentFoundDevice = await navigator.bluetooth.requestDevice(
      requestDeviceOptions,
    );

    while (currentFoundDevice.id !== firstFoundDevice.id) {
      currentFoundDevice = await navigator.bluetooth.requestDevice(
        requestDeviceOptions,
      );
    }

    const result = await navigator.bluetooth.getDevices();
    setDevices(result);
  };

  const connectDevice = (device: BluetoothDevice) => {
    console.log(device);
  };

  return (
    <Container
      className={styles.BluetoothDeviceSelection}
      data-testid="BluetoothDeviceSelection"
    >
      <Typography variant="h5">Select a bluetooth device</Typography>
      <Button onClick={() => refreshDevices()}>
        <Refresh />
      </Button>
      <List>
        {devices.map((device) => (
          <ListItem key={device.id}>
            <ListItemButton onClick={() => connectDevice(device)}>
              <ListItemIcon>
                <Bluetooth />
              </ListItemIcon>
              <ListItemText primary={device.name ?? device.id} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BluetoothDeviceSelection;
