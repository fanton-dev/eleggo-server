import React, { FC, useContext, useEffect, useState } from 'react';

import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import { HeadsetContext } from '../../contexts/HeadsetContext';
import Window from '../Window/Window';
import styles from './DetectionOptions.module.scss';
import axios from 'axios';
import { Formik } from 'formik';

interface DetectionOptionsProps {
  model: string;
}

interface OutputOption {
  file: string;
  codeFunction: string;
}

interface ModelMetadata {
  name: string;
  outputs: string[];
}

const DetectionOptions: FC<DetectionOptionsProps> = ({ model }) => {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiModelMetadataEndpoint = `${apiRoot}/neural-networks/metadata/${model}.json`;
  const apiCodeSnippetEndpoint = `${apiRoot}/code-snippets/`;
  const [filepath, setFilepath] = useState('tu-hub-demo/mouse.py');

  const { startDetecting, stopDetecting } = useContext(HeadsetContext);
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? startDetecting(model, ['print("gosho")', code, code + '\nmove_right()'])
      : stopDetecting();
  };
  const [modelMetadata, setModelMetadata] = useState<ModelMetadata>({
    name: '',
    outputs: [],
  });
  const [outputOptions, setOutputOptions] = useState<OutputOption[]>([]);
  const [code, setCode] = useState('');

  const getModelMetadata = async () => {
    const res = await axios.get(apiModelMetadataEndpoint, {
      withCredentials: true,
    });
    const metadata = res.data as ModelMetadata;

    metadata.outputs.forEach(() => {
      setOutputOptions([{ file: '', codeFunction: '' }, ...outputOptions]);
    });

    console.log(outputOptions);

    setModelMetadata(metadata);
  };

  const getFile = async () => {
    const res = await axios.get(apiCodeSnippetEndpoint + filepath, {
      withCredentials: true,
    });

    setCode(String(res.data));
  };

  useEffect(() => {
    getModelMetadata();
  }, []);

  useEffect(() => {
    getFile();
  }, [filepath]);

  const values = {
    fileLeft: 'tu-hub-demo/mouse.py',
    functionLeft: 'move_left',
    fileNone: 'tu-hub-demo/mouse.py',
    functionNone: 'None',
    fileRight: 'tu-hub-demo/mouse.py',
    functionRight: 'move_right',
  };

  return (
    <div className={styles.DetectionOptions} data-testid="DetectionOptions">
      <Window title="Configuration Options">
        <Container>
          <Typography variant="h4" display="inline">
            {modelMetadata.name}
          </Typography>
          <Switch onChange={handleSwitchChange} />
          <Typography variant="subtitle1">Output settings</Typography>
          <Typography variant="subtitle2">On Left:</Typography>
          <FormControl>
            <InputLabel id="none-file-label">File</InputLabel>
            <Select
              labelId="none-func-select-label"
              id="none-func-select"
              value={values.fileNone}
              label="File"
              onChange={() => {}}
            >
              <MenuItem value={'tu-hub-demo/mouse.py'}>
                tu-hub-demo/mouse.py
              </MenuItem>
              <MenuItem value={'tu-hub-demo/print.py'}>
                tu-hub-demo/print.py
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="left-func-label">Function</InputLabel>
            <Select
              labelId="left-func-select-label"
              id="left-func-select"
              value={values.functionLeft}
              label="Function"
              onChange={() => {}}
            >
              <MenuItem value={'None'}>None</MenuItem>
              <MenuItem value={'move_left'}>move_left</MenuItem>
              <MenuItem value={'move_right'}>move_right</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle2">On None:</Typography>
          <FormControl>
            <InputLabel id="none-file-label">File</InputLabel>
            <Select
              labelId="none-func-select-label"
              id="none-func-select"
              value={values.fileNone}
              label="File"
              onChange={() => {}}
            >
              <MenuItem value={'tu-hub-demo/mouse.py'}>
                tu-hub-demo/mouse.py
              </MenuItem>
              <MenuItem value={'tu-hub-demo/print.py'}>
                tu-hub-demo/print.py
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="none-func-label">Function</InputLabel>
            <Select
              labelId="none-func-select-label"
              id="none-func-select"
              value={values.functionNone}
              label="Function"
              onChange={() => {}}
            >
              <MenuItem value={'None'}>None</MenuItem>
              <MenuItem value={'move_left'}>move_left</MenuItem>
              <MenuItem value={'move_right'}>move_right</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle2">On Right:</Typography>
          <FormControl>
            <InputLabel id="none-file-label">File</InputLabel>
            <Select
              labelId="right-func-select-label"
              id="right-func-select"
              value={values.fileRight}
              label="File"
              onChange={() => {}}
            >
              <MenuItem value={'tu-hub-demo/mouse.py'}>
                tu-hub-demo/mouse.py
              </MenuItem>
              <MenuItem value={'tu-hub-demo/print.py'}>
                tu-hub-demo/print.py
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="right-func-label">Function</InputLabel>
            <Select
              labelId="right-func-select-label"
              id="right-func-select"
              value={values.functionRight}
              label="Function"
              onChange={() => {}}
            >
              <MenuItem value={'None'}>None</MenuItem>
              <MenuItem value={'move_left'}>move_left</MenuItem>
              <MenuItem value={'move_right'}>move_right</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </Window>
    </div>
  );
};

export default DetectionOptions;
