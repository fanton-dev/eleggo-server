import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterForm from './RegisterForm';

describe('<RegisterForm />', () => {
  test('it should mount', () => {
    render(<RegisterForm />);

    const registerForm = screen.getByTestId('RegisterForm');

    expect(registerForm).toBeInTheDocument();
  });
});
