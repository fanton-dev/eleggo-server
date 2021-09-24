import {FormControlLabel, FormGroup, Switch} from '@material-ui/core';
import React, {FC, useState} from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import styles from './ModeSelection.module.css';
import {withStyles} from '@material-ui/core/styles';

interface Props {
  switchModeCallback: (switchValue: boolean) => void,
  chosenModeCallback: (mode: string) => void,
}

const CustomSwitch = withStyles({
  switchBase: {
    'color': 'grey',
    '&$checked': {
      color: '#339C5E',
    },
    '&$checked + $track': {
      backgroundColor: '#225333',
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectControl: {
    paddingLeft: '8px',
  },
}));

const ModeSelection: FC<Props> = (props: Props) => {
  const classes = useStyles();
  const modes = ['Hand Movement', 'Thought of direction'];
  const [modeSwitch, setModeSwitch] = useState(false);
  const [mode, setMode] = useState('');

  const handleModeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModeSwitch(event.target.checked);
    props.switchModeCallback(event.target.checked);
  };

  const handleModeSelect = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    setMode(String(event.target.value));
    props.chosenModeCallback(String(event.target.value));
  };

  return (
    <div className={styles.modeSelection} >
      <FormGroup>
        <FormControlLabel
          style={{minWidth: 190}}
          className={classes.selectControl}
          control={
            <CustomSwitch
              checked={modeSwitch}
              onChange={handleModeSwitch}
              name="modeSwitch"
            />
          }
          label={modeSwitch === true ? 'Enabled' : 'Disabled'}
        />
      </FormGroup>

      <FormControl className={classNames(classes.formControl, styles.select)}>
        <InputLabel id="demo-simple-select-helper-label">
          Select Mode
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={mode}
          onChange={handleModeSelect}
        >
          {
            modes.map((currentMode) => {
              return <MenuItem key={currentMode} value={currentMode}>
                {currentMode}
              </MenuItem>;
            })
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default ModeSelection;
