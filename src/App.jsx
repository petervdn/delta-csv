import React, { useState } from "react";
import UploadBar from "./components/UploadBar";
import "./App.css";
import { OnFileParsedContext } from "./data/context";
import Result from "./components/Result";
import deltaColumnNames from "./data/deltaColumnNames";

const App = () => {
  const [result, setResult] = useState([deltaColumnNames.join(",")]);
  const onFileParsed = lines => {

    setResult([...result, ...lines]);
  };
  return (
    <div className="App">
      <OnFileParsedContext.Provider value={onFileParsed}>
        <UploadBar title={"test"} />
      </OnFileParsedContext.Provider>
      <Result result={result} />
    </div>
  );
};

export default App;
