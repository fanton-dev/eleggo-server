import React, { createContext } from 'react';

const configuration = {
  api: {
    root: process.env.REACT_APP_API_ROOT || '',
  },
};
const configurationContext = createContext(configuration);

const ConfigurationContext = () => {
  return (
    <configurationContext.Provider
      value={configuration}
    ></configurationContext.Provider>
  );
};

export { configurationContext };
export default ConfigurationContext;
