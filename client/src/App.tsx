import * as dotenv from 'dotenv';

import React, { FC } from 'react';
import { Container } from '@mui/material';

const environment = process.env.NODE_ENV;
const envFilePath = !environment ? '.env' : `.env.${environment}`;
dotenv.config({ path: envFilePath });

const App: FC<{}> = () => {
  return <Container className="App"></Container>;
};

export default App;
