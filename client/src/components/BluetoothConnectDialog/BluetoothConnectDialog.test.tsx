import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BluetoothConnectDialog from './BluetoothConnectDialog';

describe('<BluetoothConnectDialog />', () => {
  test('it should mount', () => {
    render(<BluetoothConnectDialog />);

    const bluetoothConnectDialog = screen.getByTestId('BluetoothConnectDialog');

    expect(bluetoothConnectDialog).toBeInTheDocument();
  });
});
