import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeFileExplorer from './CodeFileExplorer';

describe('<CodeFileExplorer />', () => {
  test('it should mount', () => {
    render(<CodeFileExplorer />);
    
    const codeFileExplorer = screen.getByTestId('CodeFileExplorer');

    expect(codeFileExplorer).toBeInTheDocument();
  });
});