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

interface DevicesTable {
  [key: string]: BluetoothDevice;
}

const BluetoothDeviceSelection: FC<{}> = () => {
  const [devices, setDevices] = useState<DevicesTable>({});

  const refreshDevices = async () => {
    const requestDeviceOptions = {
      acceptAllDevices: true,
    };
    const result: DevicesTable = {};

    const firstFoundDevice = await navigator.bluetooth.requestDevice(
      requestDeviceOptions,
    );
    result[firstFoundDevice.id] = firstFoundDevice;

    let currentFoundDevice = await navigator.bluetooth.requestDevice(
      requestDeviceOptions,
    );

    while (currentFoundDevice.id !== firstFoundDevice.id) {
      result[currentFoundDevice.id] = currentFoundDevice;
      currentFoundDevice = await navigator.bluetooth.requestDevice(
        requestDeviceOptions,
      );
    }

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
        {Object.values(devices).map((device) => (
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
