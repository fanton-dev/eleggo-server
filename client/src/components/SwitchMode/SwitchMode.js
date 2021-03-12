import React from 'react'
import CodeInput from '../CodeInput/CodeInput'
import ModeSelection from '../ModeSelection/ModeSelection'
import styles from './SwitchMode.module.css';

const SwitchMode = () => {
    return (
        <div className={styles.switchMode}>
            <ModeSelection />  
            <CodeInput className={styles.codeInput} /> 
        </div>
    )
}

export default SwitchMode
