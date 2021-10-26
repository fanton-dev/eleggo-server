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
import React, { FC, useContext, useState } from 'react';
import styles from './BluetoothDeviceSelection.module.scss';
import { Bluetooth, Refresh } from '@mui/icons-material';
import { HeadsetContext } from '../../contexts/HeadsetContext';

interface DevicesTable {
  [key: string]: BluetoothDevice;
}

interface BluetoothDeviceSelectionProps {
  handleDeviceClick: (device: BluetoothDevice) => void;
}

const BluetoothDeviceSelection: FC<BluetoothDeviceSelectionProps> = (
  props: BluetoothDeviceSelectionProps,
) => {
  const [devices, setDevices] = useState<DevicesTable>({});
  const { setHeadset } = useContext(HeadsetContext);

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

  return (
    <Container
      className={styles.BluetoothDeviceSelection}
      data-testid="BluetoothDeviceSelection"
    >
      <Button onClick={() => refreshDevices()}>
        <Refresh />
      </Button>
      <List>
        {Object.values(devices).map((device) => (
          <ListItem key={device.id}>
            <ListItemButton onClick={() => props.handleDeviceClick(device)}>
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
