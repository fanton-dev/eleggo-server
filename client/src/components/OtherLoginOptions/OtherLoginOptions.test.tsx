import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OtherLoginOptions from './OtherLoginOptions';

describe('<OtherLoginOptions />', () => {
  beforeEach(() => {
    render(<OtherLoginOptions />);
  });

  test('it should mount', () => {
    const otherLoginOptions = screen.getByTestId('OtherLoginOptions');

    expect(otherLoginOptions).toBeInTheDocument();
  });
});
