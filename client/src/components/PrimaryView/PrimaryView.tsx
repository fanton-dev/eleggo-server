import React, { FC, useState } from 'react';
import HeadsetProvider from '../../contexts/HeadsetContext';
import Navbar from '../Navbar/Navbar';
import HeadsetMonitor from '../HeadsetMonitor/HeadsetMonitor';
import HeadsetAutomation from '../HeadsetAutomation/HeadsetAutomation';
import CodeEditor from '../CodeEditor/CodeEditor';
import Recordings from '../Recordings/Recordings';
import styles from './PrimaryView.module.scss';

export enum MainComponent {
  HeadsetAutomation,
  HeadsetMonitor,
  CodeEditor,
  Recordings,
}

const PrimaryView: FC<{}> = () => {
  const [mainComponent, setMainComponent] = useState<MainComponent | undefined>(
    MainComponent.HeadsetMonitor,
  );

  const renderMainComponent = (component?: MainComponent) => {
    switch (component) {
      case MainComponent.HeadsetMonitor:
        return <HeadsetMonitor />;

      case MainComponent.HeadsetAutomation:
        return <HeadsetAutomation />;

      case MainComponent.CodeEditor:
        return <CodeEditor />;

      case MainComponent.Recordings:
        return <Recordings />;

      default:
        break;
    }
  };

  return (
    <div className={styles.PrimaryView} data-testid="PrimaryView">
      <HeadsetProvider>
        <div className={styles.Grid}>
          <div className={styles.Navbar}>
            <Navbar
              mainComponent={mainComponent}
              setMainComponent={setMainComponent}
            />
          </div>
          <div className={styles.Main}>
            {renderMainComponent(mainComponent)}
          </div>
        </div>
      </HeadsetProvider>
    </div>
  );
};

export default PrimaryView;
