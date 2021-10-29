import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BluetoothDeviceSelection from './BluetoothDeviceSelection';

describe('<BluetoothDeviceSelection />', () => {
  test('it should mount', () => {
    render(<BluetoothDeviceSelection />);

    const bluetoothDeviceSelection = screen.getByTestId(
      'BluetoothDeviceSelection',
    );

    expect(bluetoothDeviceSelection).toBeInTheDocument();
  });
});
