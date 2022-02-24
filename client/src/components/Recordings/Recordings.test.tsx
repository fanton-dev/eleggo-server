import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Recordings from './Recordings';

describe('<Recordings />', () => {
  test('it should mount', () => {
    render(<Recordings />);
    
    const recordings = screen.getByTestId('Recordings');

    expect(recordings).toBeInTheDocument();
  });
});