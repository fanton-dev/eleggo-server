import React, { FC, useState } from 'react';
import CodeFileExplorer from '../CodeFileExplorer/CodeFileExplorer';
import CodeArea from '../CodeArea/CodeArea';

import styles from './CodeEditor.module.scss';

const CodeEditor: FC<{}> = ({}) => {
  const [filepath, setFilepath] = useState<string | undefined>(undefined);

  return (
    <div className={styles.CodeEditor} data-testid="CodeEditor">
      <div className={styles.DetectionModelsList}>
        <CodeFileExplorer setFilepath={setFilepath} />
      </div>
      <div className={styles.DetectionOptions}>
        <CodeArea filepath={filepath} />
      </div>
    </div>
  );
};

export default CodeEditor;
