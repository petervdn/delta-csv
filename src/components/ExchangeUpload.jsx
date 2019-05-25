import React from "react";
import { Exchange } from "../data/exchanges";
import { readBitstampExport } from "../util/bitstamp";
import { OnFileParsedContext } from "../data/context";

const ExchangeUpload = ({ exchange }) => {
  const onDragOver = e => {
    e.preventDefault();
    // Set the dropEffect to move
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <OnFileParsedContext.Consumer>
      {onFileParsed => (
        <div
          className="item"
          onDragOver={onDragOver}
          onDrop={async e => {
            e.preventDefault();

            const file = e.dataTransfer.files[0];

            switch (exchange) {
              case Exchange.BITSTAMP: {
                onFileParsed(await readBitstampExport(file));

                break;
              }
              default: {
                console.error(`Unhandled exchange ${exchange}`);
              }
            }
          }}
        >
          <p>{exchange}</p>
        </div>
      )}
    </OnFileParsedContext.Consumer>
  );
};

export default ExchangeUpload;
