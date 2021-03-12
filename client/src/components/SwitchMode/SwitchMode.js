import React, { useState } from 'react'
import CodeInput from '../CodeInput/CodeInput'
import ModeSelection from '../ModeSelection/ModeSelection'
import styles from './SwitchMode.module.css';
import axios from 'axios';

const SwitchMode = () => {

    const [modeSwitch, setModeSwitch] = useState(false);
    const [chosenMode, setChosenMode] = useState('');
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    const [none, setNone] = useState('');
    const [prerequisite, setPrerequisite] = useState('');

    const checkSwitchMode = (switchValue) => {
        setModeSwitch(switchValue)
    }

    const setMode = (mode) => {
        setChosenMode(mode);
    }

    if (modeSwitch === true) {

        let data = {
            mode: chosenMode,
            code: {
                left,
                right,
                none,
                prerequisite
            }
        }

        console.log(data)

        axios.post('http://localhost:5000/enable-detection', data)
             .then(res => console.log(res))
    }

    return (
        <div className={styles.switchMode}>
            <ModeSelection switchModeCallback={checkSwitchMode} chosenModeCallback={setMode} />  
            <CodeInput className={styles.codeInput} 
                       leftCallback={(code) => setLeft(code)}
                       noneCallback={(code) => setNone(code)}
                       rightCallback={(code) => setRight(code)}
                       prereqCallback={(code) => setPrerequisite(code)}
            /> 
        </div>
    )
}

export default SwitchMode
