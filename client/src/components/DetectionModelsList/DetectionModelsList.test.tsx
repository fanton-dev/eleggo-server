import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DetectionModelsList from './DetectionModelsList';

describe('<DetectionModelsList />', () => {
  test('it should mount', () => {
    render(<DetectionModelsList />);
    
    const detectionModelsList = screen.getByTestId('DetectionModelsList');

    expect(detectionModelsList).toBeInTheDocument();
  });
});