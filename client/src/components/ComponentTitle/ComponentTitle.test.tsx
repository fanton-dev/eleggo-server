import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComponentTitle from './ComponentTitle';

describe('<ComponentTitle />', () => {
  test('it should mount', () => {
    render(<ComponentTitle />);
    
    const componentTitle = screen.getByTestId('ComponentTitle');

    expect(componentTitle).toBeInTheDocument();
  });
});