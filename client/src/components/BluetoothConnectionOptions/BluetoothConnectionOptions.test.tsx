import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BluetoothConnectionOptions from './BluetoothConnectionOptions';

describe('<BluetoothConnectionOptions />', () => {
  test('it should mount', () => {
    render(<BluetoothConnectionOptions />);
    
    const bluetoothConnectionOptions = screen.getByTestId('BluetoothConnectionOptions');

    expect(bluetoothConnectionOptions).toBeInTheDocument();
  });
});