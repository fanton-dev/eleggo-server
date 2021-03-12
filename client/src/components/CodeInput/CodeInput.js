import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
      background: '#339C5E'
  },
}));

const CodeInput = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="horizontal"
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ className: classes.indicator }}
      >
        <Tab label="Left" {...a11yProps(0)} />
        <Tab label="None" {...a11yProps(1)} />
        <Tab label="Right" {...a11yProps(2)} />
        <Tab label="Prerequisite" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Zdr
      </TabPanel>
      <TabPanel value={value} index={1}>
        None
      </TabPanel>
      <TabPanel value={value} index={2}>
        Right
      </TabPanel>
      <TabPanel value={value} index={3}>
        Prerequisite
      </TabPanel>
    </div>
  );
}

export default CodeInput;