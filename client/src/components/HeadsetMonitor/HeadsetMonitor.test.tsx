import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeadsetMonitor from './HeadsetMonitor';

describe('<HeadsetMonitor />', () => {
  test('it should mount', () => {
    render(<HeadsetMonitor />);
    
    const headsetMonitor = screen.getByTestId('HeadsetMonitor');

    expect(headsetMonitor).toBeInTheDocument();
  });
});