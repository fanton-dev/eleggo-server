import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterView from './RegisterView';

describe('<RegisterView />', () => {
  test('it should mount', () => {
    render(<RegisterView />);
    
    const registerView = screen.getByTestId('RegisterView');

    expect(registerView).toBeInTheDocument();
  });
});