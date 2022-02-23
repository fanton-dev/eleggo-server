import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DetectionOptions from './DetectionOptions';

describe('<DetectionOptions />', () => {
  test('it should mount', () => {
    render(<DetectionOptions />);
    
    const detectionOptions = screen.getByTestId('DetectionOptions');

    expect(detectionOptions).toBeInTheDocument();
  });
});