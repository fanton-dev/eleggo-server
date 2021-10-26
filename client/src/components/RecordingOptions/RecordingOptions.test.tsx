import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecordingOptions from './RecordingOptions';

describe('<RecordingOptions />', () => {
  test('it should mount', () => {
    render(<RecordingOptions />);
    
    const recordingOptions = screen.getByTestId('RecordingOptions');

    expect(recordingOptions).toBeInTheDocument();
  });
});