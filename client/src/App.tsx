import React from 'react';
import Header from './components/Header/Header';
import Plot from './components/Plot/Plot';
import SwitchMode from './components/SwitchMode/SwitchMode';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Plot />
      <SwitchMode />
    </div>
  );
};

export default App;
