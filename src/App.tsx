import React, { useState } from 'react';
import './style/App.css';
import { OnFileParsedContext } from './data/context';
import UploadBar from './components/UploadBar';
import Result from './components/Result';
import { ResultRows } from './data/types';

const App = () => {
  // const [result, setResult] = useState([deltaColumnNames.join(",")]);
  const [rows, setRows] = useState<ResultRows[]>([]);
  const addResultRows = (newRows: ResultRows[]) => {
    setRows([...rows, ...newRows]);
  };

  return (
      <div className="App">
        <OnFileParsedContext.Provider value={addResultRows}>
          <UploadBar />
        </OnFileParsedContext.Provider>
        <Result rows={rows} />
      </div>
  );
};


export default App;
