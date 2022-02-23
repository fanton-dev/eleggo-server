import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeArea from './CodeArea';

describe('<CodeArea />', () => {
  test('it should mount', () => {
    render(<CodeArea />);
    
    const codeArea = screen.getByTestId('CodeArea');

    expect(codeArea).toBeInTheDocument();
  });
});