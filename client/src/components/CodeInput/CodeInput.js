import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './CodeInput.module.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
      background: '#339C5E'
  },
}));

const TabPanel = ({ children, value, index, leftCallback, noneCallback, rightCallback, prereqCallback }) => {

  const [code, setCode] = useState('');

  const handleCodeChange = (event) => { 

    setCode(event.target.value);

    if (value === 0) {
      leftCallback(event.target.value);
    } else {
      if (value === 1) {
        noneCallback(event.target.value);
      } else {
        if (value === 2) {
          rightCallback(event.target.value);
        } else {
          if (value === 3) {
            prereqCallback(event.target.value);
          }
        }
      }
    }
  }

  return (
    <div>
      {
        value === index ?   
          <textarea placeholder='Some code goes brrr...' className={styles.code} value={code} onChange={handleCodeChange}>
          </textarea>
        : ''
      }
    </div>
  )
}

const CodeInput = ({ leftCallback, noneCallback, rightCallback, prereqCallback }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const indexes = [0, 1, 2, 3];

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs value={selectedTab} onChange={handleChange} TabIndicatorProps={{ className: classes.indicator }} >
          <Tab label="Left" />
          <Tab label="None" />
          <Tab label="Right" />
          <Tab label="Prerequisite" />
      </Tabs>
      {
        indexes.map(index => {
          return (
            <TabPanel key={index} value={selectedTab} index={index}
                      leftCallback={(code) => leftCallback(code)}
                      noneCallback={(code) => noneCallback(code)}
                      rightCallback={(code) => rightCallback(code)}
                      prereqCallback={(code) => prereqCallback(code)}          
            ></TabPanel>
          )
        })
      }
    </div>
  )
}

export default CodeInput;