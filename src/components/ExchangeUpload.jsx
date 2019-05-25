import React from "react";
import loadTextFile from '../util/loadTextFile';

const ExchangeUpload = ({ exchange }) => {
  const onDragOver = e => {
    e.preventDefault();
    // Set the dropEffect to move
    e.dataTransfer.dropEffect = "move";
  };
  const onDrop = async e => {
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    // const data = e.dataTransfer.getData("text/plain");
    const file = await loadTextFile(e.dataTransfer.files[0]);
    console.log(file);
  };
  return (
    <div className="item" onDragOver={onDragOver} onDrop={onDrop}>
      <p>{exchange}</p>
    </div>
  );
};

export default ExchangeUpload;
