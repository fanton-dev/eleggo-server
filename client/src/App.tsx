import * as dotenv from 'dotenv';

import React, { FC, useContext } from 'react';
import PrimaryView from './components/PrimaryView/PrimaryView';
import LoginView from './components/LoginView/LoginView';
import UserProvider, { UserContext } from './contexts/UserContext';

const environment = process.env.NODE_ENV;
const envFilePath = !environment ? '.env' : `.env.${environment}`;
dotenv.config({ path: envFilePath });

const App: FC<{}> = () => {
  const { sessionCookie } = useContext(UserContext);
  return (
    <div className="App">
      <UserProvider>
        {!sessionCookie ? <PrimaryView /> : <LoginView />}
      </UserProvider>
    </div>
  );
};

export default App;
