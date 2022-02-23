import {
  Code,
  MotionPhotosAuto,
  QueryStats,
  RadioButtonChecked,
} from '@mui/icons-material';
import React, { FC } from 'react';
import NavbarIcon from '../NavbarIcon/NavbarIcon';
import { MainComponent } from '../PrimaryView/PrimaryView';
import styles from './Navbar.module.scss';

interface NavbarProps {
  mainComponent?: MainComponent;
  setMainComponent: (mainComponent: MainComponent) => void;
}

const Navbar: FC<NavbarProps> = ({ mainComponent, setMainComponent }) => (
  <div className={styles.Navbar} data-testid="Navbar">
    <NavbarIcon
      onClick={() => setMainComponent(MainComponent.HeadsetMonitor)}
      isHighlighted={mainComponent === MainComponent.HeadsetMonitor}
      primaryColor="#333333"
      secondaryColor="#923832"
    >
      <QueryStats />
    </NavbarIcon>
    <NavbarIcon
      onClick={() => setMainComponent(MainComponent.HeadsetAutomation)}
      isHighlighted={mainComponent === MainComponent.HeadsetAutomation}
      primaryColor="#333333"
      secondaryColor="#923832"
    >
      <MotionPhotosAuto />
    </NavbarIcon>
    <NavbarIcon
      onClick={() => setMainComponent(MainComponent.CodeEditor)}
      isHighlighted={mainComponent === MainComponent.CodeEditor}
      primaryColor="#333333"
      secondaryColor="#923832"
    >
      <Code />
    </NavbarIcon>
    <NavbarIcon
      onClick={() => setMainComponent(MainComponent.Recordings)}
      isHighlighted={mainComponent === MainComponent.Recordings}
      primaryColor="#333333"
      secondaryColor="#923832"
    >
      <RadioButtonChecked />
    </NavbarIcon>
  </div>
);

export default Navbar;
