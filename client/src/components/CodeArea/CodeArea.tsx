import React, { FC, useEffect, useState } from 'react';
import TextCodeEditor from '@uiw/react-textarea-code-editor';
import Window from '../Window/Window';
import styles from './CodeArea.module.scss';
import axios from 'axios';

interface CodeAreaProps {
  filepath: string | undefined;
}

const CodeArea: FC<CodeAreaProps> = ({ filepath }) => {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiCodeSnippetEndpoint = `${apiRoot}/code-snippets/${filepath}`;

  const [code, setCode] = useState(
    `def example:
      print("Hello Eleggo!")`,
  );

  const getFileContent = async () => {
    const res = await axios.get(apiCodeSnippetEndpoint, {
      withCredentials: true,
    });

    setCode(String(res.data));
  };

  useEffect(() => {
    getFileContent();
  }, [filepath]);

  // Save the code on the server when the user stops typing for 3 seconds
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(code);
      axios({
        method: 'PUT',
        url: apiCodeSnippetEndpoint,
        data: code,
        withCredentials: true,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [code]);

  return (
    <div className={styles.CodeArea} data-testid="CodeArea">
      {filepath ? (
        <Window title={filepath}>
          <TextCodeEditor
            value={code}
            language="js"
            placeholder="Please enter Python code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 14,
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </Window>
      ) : (
        <Window title=""></Window>
      )}
    </div>
  );
};

export default CodeArea;
