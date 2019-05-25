import React from "react";
import { exchanges } from "../data/exchanges";
import ExchangeUpload from "./ExchangeUpload";
import "../style/ExchangeUpload.css";

const UploadBar = () => {
  return (
    <>
      <h2>Upload csv </h2>
      <div className="exchange-upload">
        {exchanges.map(exchange => (
          <ExchangeUpload exchange={exchange} key={exchange} />
        ))}
      </div>
    </>
  );
};

export default UploadBar;
