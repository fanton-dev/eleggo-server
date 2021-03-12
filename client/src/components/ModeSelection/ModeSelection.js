import React, { useState } from 'react';
import { Switch, FormGroup, FormControlLabel } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './ModeSelection.module.css'

const CustomSwitch = withStyles({
    switchBase: {
        color: 'grey',
        '&$checked': {
          color: '#339C5E',
        },
        '&$checked + $track': {
          backgroundColor: '#225333',
        },
      },
      checked: {},
      track: {},
})(Switch)

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectControl: {
        float: 'right'
    }
  }));

const ModeSelection = () => {

    const classes = useStyles();
    const modes = ['Hand Movement', 'Thought of direction']
    const [modeSwitch, setModeSwitch] = useState(false);
    const [mode, setMode] = useState('');

    const handleModeSwitch = (event) => {
        setModeSwitch(event.target.checked)
    }

    const handleModeSelect = (event) => {
        setMode(event.target.value);
    }

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    className={classes.selectControl}
                    control={<CustomSwitch checked={modeSwitch} onChange={handleModeSwitch} name="modeSwitch" />}
                    label={modeSwitch === true ? 'Enabled' : 'Disabled'}
                    labelPlacement='bottom'
                >
                </FormControlLabel>
            </FormGroup>

            <FormControl className={classNames(classes.formControl, styles.select)}>
                <InputLabel id="demo-simple-select-helper-label">Select Mode</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={mode}
                    onChange={handleModeSelect}
                >
                    {
                        modes.map(mode => {
                            return <MenuItem key={mode} value={mode}>
                                        {mode}
                                    </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default ModeSelection
