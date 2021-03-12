import React, { useState } from 'react'
import CodeInput from '../CodeInput/CodeInput'
import ModeSelection from '../ModeSelection/ModeSelection'
import styles from './SwitchMode.module.css';
import axios from 'axios';

const SwitchMode = () => {

    const [modeSwitch, setModeSwitch] = useState(false);
    const [chosenMode, setChosenMode] = useState('');

    const checkSwitchMode = (switchValue) => {
        setModeSwitch(switchValue)
    }

    const setMode = (mode) => {
        setChosenMode(mode);
    }

    if (modeSwitch === true) {

        let data = {
            mode: chosenMode,
        }

        axios.post('http://localhost:5000/enable-detection', data)
             .then(res => console.log(res))
    }

    return (
        <div className={styles.switchMode}>
            <ModeSelection switchModeCallback={checkSwitchMode} chosenModeCallback={setMode} />  
            <CodeInput className={styles.codeInput} /> 
        </div>
    )
}

export default SwitchMode
