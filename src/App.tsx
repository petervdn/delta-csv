import React, { useEffect, useState } from 'react';
import './style/App.css';
import { OnFileParsedContext } from './data/context';
import UploadBar from './components/UploadBar';
import Result from './components/Result';
import { ResultRows } from './data/types';
import { parseBitstampExport } from './util/bitstamp';

const App = () => {
  const [rows, setRows] = useState<ResultRows[]>([]);
  const addResultRows = (newRows: ResultRows[]) => {
    setRows([...rows, ...newRows]);
  };


  useEffect(() => {
      fetch('./bitstamp-transactions-all.csv').then(async response => {
          const file = await response.text();
          setRows(parseBitstampExport(file));
      });
  }, []);

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
