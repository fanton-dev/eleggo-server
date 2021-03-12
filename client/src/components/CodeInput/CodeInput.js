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

const TabPanel = ({ children, value, index }) => {
  return (
    <div>
      {
        value === index ? 
          <textarea placeholder='Some code goes brrr...' className={styles.code}>
          </textarea>
        : ''
      }
    </div>
  )
}

const CodeInput = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

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
      <TabPanel value={selectedTab} index={0}></TabPanel>
      <TabPanel value={selectedTab} index={1}></TabPanel>
      <TabPanel value={selectedTab} index={2}></TabPanel>
      <TabPanel value={selectedTab} index={3}></TabPanel>
    </div>
  )
}

export default CodeInput;