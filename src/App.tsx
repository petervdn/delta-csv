import React, { useState } from 'react';
import './style/App.css';
import { OnFileParsedContext } from './data/context';
import UploadBar from './components/UploadBar';
import deltaColumnNames from './data/deltaColumnNames';
import Result from './components/Result';

const App = () => {
  const [result, setResult] = useState([deltaColumnNames.join(",")]);
  const onFileParsed = (lines: Array<string>) => {
    setResult([...result, ...lines]);
  };

  return (
      <div className="App">
        <OnFileParsedContext.Provider value={onFileParsed}>
          <UploadBar />
        </OnFileParsedContext.Provider>
        <Result result={result} />
      </div>
  );
};


export default App;
