import React, { FC } from 'react';
import styles from './NavbarIcon.module.scss';

interface NavbarIconInterface {
  onClick: (component: any) => void;
  isHighlighted: boolean;
  primaryColor: string;
  secondaryColor: string;
}

const NavbarIcon: FC<NavbarIconInterface> = ({
  children,
  onClick,
  isHighlighted,
  primaryColor,
  secondaryColor,
}) => (
  <div
    className={styles.NavbarIcon}
    data-testid="NavbarIcon"
    onClick={onClick}
    style={
      isHighlighted
        ? {
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            filter: 'drop-shadow(0 0 0.5rem #00000040)',
          }
        : {
            color: primaryColor,
          }
    }
  >
    {children}
  </div>
);

export default NavbarIcon;
