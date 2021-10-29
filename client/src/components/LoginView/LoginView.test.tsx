import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginView from './LoginView';

describe('<LoginView />', () => {
  test('it should mount', () => {
    render(<LoginView />);

    const loginView = screen.getByTestId('LoginView');

    expect(loginView).toBeInTheDocument();
  });
});
