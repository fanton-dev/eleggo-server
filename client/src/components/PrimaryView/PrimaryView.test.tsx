import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrimaryView from './PrimaryView';

describe('<PrimaryView />', () => {
  test('it should mount', () => {
    render(<PrimaryView />);

    const primaryView = screen.getByTestId('PrimaryView');

    expect(primaryView).toBeInTheDocument();
  });
});
