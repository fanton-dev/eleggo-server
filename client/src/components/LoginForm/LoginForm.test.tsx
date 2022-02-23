import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  test('it should mount', () => {
    const loginForm = screen.getByTestId('LoginForm');

    expect(loginForm).toBeInTheDocument();
  });

  // test('', () => {});
});
