import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavbarIcon from './NavbarIcon';

describe('<NavbarIcon />', () => {
  test('it should mount', () => {
    render(<NavbarIcon />);
    
    const navbarIcon = screen.getByTestId('NavbarIcon');

    expect(navbarIcon).toBeInTheDocument();
  });
});