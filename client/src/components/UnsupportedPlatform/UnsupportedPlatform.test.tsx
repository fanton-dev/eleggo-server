import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UnsupportedPlatform from './UnsupportedPlatform';

describe('<UnsupportedPlatform />', () => {
  test('it should mount', () => {
    render(<UnsupportedPlatform />);
    
    const unsupportedPlatform = screen.getByTestId('UnsupportedPlatform');

    expect(unsupportedPlatform).toBeInTheDocument();
  });
});