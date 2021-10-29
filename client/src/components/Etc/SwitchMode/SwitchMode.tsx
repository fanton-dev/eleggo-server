import React, { useEffect, useState } from 'react';

import CodeInput from '../CodeInput/CodeInput';
import ModeSelection from '../ModeSelection/ModeSelection';
import axios from 'axios';
import styles from './SwitchMode.module.css';

const SwitchMode = () => {
  const [modeSwitch, setModeSwitch] = useState(false);
  const [chosenMode, setChosenMode] = useState('');
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [none, setNone] = useState('');
  const [prerequisite, setPrerequisite] = useState('');

  const checkSwitchMode = (switchValue: boolean): void => {
    setModeSwitch(switchValue);
  };

  const setMode = (mode: string): void => {
    setChosenMode(mode);
  };

  useEffect(() => {
    if (modeSwitch) {
      const data = {
        mode: chosenMode,
        code: {
          left,
          right,
          none,
          prerequisite,
        },
      };

      axios
        .post('http://localhost:5000/enable-detection', data)
        .then((res) => console.log(res));
    }
  }, [modeSwitch, left, right, none, prerequisite, chosenMode]);

  useEffect(() => {
    if (modeSwitch === false) {
      axios.delete('http://localhost:5000/disable-detection');
    }
  }, [modeSwitch]);

  const modeSelectionProps = {
    switchModeCallback: checkSwitchMode,
    chosenModeCallback: setMode,
    className: styles.switch,
  };

  const codeInputProps = {
    className: styles.codeInput,
    leftCallback: (code: string) => setLeft(code),
    noneCallback: (code: string) => setNone(code),
    rightCallback: (code: string) => setRight(code),
    prereqCallback: (code: string) => setPrerequisite(code),
  };

  return (
    <div className={styles.switchMode}>
      <ModeSelection {...modeSelectionProps} />
      <CodeInput {...codeInputProps} />
    </div>
  );
};

export default SwitchMode;
