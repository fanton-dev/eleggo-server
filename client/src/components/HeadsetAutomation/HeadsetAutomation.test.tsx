import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeadsetAutomation from './HeadsetAutomation';

describe('<HeadsetAutomation />', () => {
  test('it should mount', () => {
    render(<HeadsetAutomation />);
    
    const headsetAutomation = screen.getByTestId('HeadsetAutomation');

    expect(headsetAutomation).toBeInTheDocument();
  });
});