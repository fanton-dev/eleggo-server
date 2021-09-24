import React, {FC, useState} from 'react';

import {ChangeEventHandler} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {makeStyles} from '@material-ui/core/styles';
import styles from './CodeInput.module.css';

interface CodeInputProps {
  leftCallback: (code: string) => void;
  noneCallback: (code: string) => void;
  rightCallback: (code: string) => void;
  prereqCallback: (code: string) => void;
}

interface TabPanelProps extends CodeInputProps {
  value: number;
  index: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    background: '#339C5E',
  },
}));

const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
  const [code, setCode] = useState('');

  const handleCodeChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setCode(event.target.value);

    switch (props.value) {
      case 0:
        props.leftCallback(event.target.value);
        break;
      case 1:
        props.noneCallback(event.target.value);
        break;
      case 2:
        props.rightCallback(event.target.value);
        break;
      case 3:
        props.prereqCallback(event.target.value);
        break;
    }
  };

  return (
    <div>
      {
        props.value === props.index ?
          <textarea
            placeholder='//Type your code here...'
            className={styles.code}
            value={code}
            onChange={handleCodeChange}
          /> : ''
      }
    </div>
  );
};

const CodeInput: FC<CodeInputProps> = (props: CodeInputProps) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const indexes = [0, 1, 2, 3];

  const handleChange: ((
    event: React.ChangeEvent<{}>,
    value: any,
  ) => void) = (_, newValue) => setSelectedTab(newValue);

  return (
    <div className={classes.root}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        TabIndicatorProps={{className: classes.indicator}}
      >
        <Tab label="Left" />
        <Tab label="None" />
        <Tab label="Right" />
        <Tab label="Prerequisite" />
      </Tabs>
      {
        indexes.map((index) => {
          return (
            <TabPanel
              key={index}
              value={selectedTab}
              index={index}
              leftCallback={(code) => props.leftCallback(code)}
              noneCallback={(code) => props.noneCallback(code)}
              rightCallback={(code) => props.rightCallback(code)}
              prereqCallback={(code) => props.prereqCallback(code)}
            />
          );
        })
      }
    </div>
  );
};

export default CodeInput;
