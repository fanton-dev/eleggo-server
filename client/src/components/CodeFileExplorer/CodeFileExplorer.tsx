import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Window from '../Window/Window';
import { TreeItem, TreeView } from '@mui/lab';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import styles from './CodeFileExplorer.module.scss';

interface CodeFileExploreProps {
  setFilepath: (filepath: string | undefined) => void;
}

const CodeFileExplorer: FC<CodeFileExploreProps> = ({ setFilepath }) => {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiCodeSnippetsEndpoint = `${apiRoot}/code-snippets/`;

  const [files, setFiles] = useState<any>({});

  const getFiles = async () => {
    const res = await axios.get(apiCodeSnippetsEndpoint, {
      withCredentials: true,
    });

    setFiles(res.data);
  };

  const createTree = (data: object, directory: string) => {
    const result: JSX.Element[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (value === 'file') {
        result.push(
          <TreeItem
            key={directory + key}
            nodeId={directory + key}
            label={key}
            ContentProps={{
              onClick: () => setFilepath(directory + key),
            }}
          />,
        );
      } else {
        result.push(
          <TreeItem key={directory + key} nodeId={directory + key} label={key}>
            {createTree(value, directory + key)}
          </TreeItem>,
        );
      }
    }

    return result;
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className={styles.CodeFileExplorer} data-testid="CodeFileExplorer">
      <Window title="Code Snippets">
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          sx={{ overflowX: 'hidden' }}
        >
          {createTree(files, '')}
        </TreeView>
      </Window>
    </div>
  );
};

export default CodeFileExplorer;
