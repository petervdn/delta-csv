import React, { SyntheticEvent } from "react";
import { Exchange } from "../data/exchanges";
import { OnFileParsedContext } from "../data/context";
import { ResultRows } from "../data/types";
import { parseBitstampExport   } from "../util/bitstamp";
import loadTextFile from '../util/loadTextFile';

const ExchangeUpload = ({ exchange }: { exchange: string }) => {
  const onDragOver = (event: SyntheticEvent<HTMLElement, DragEvent>) => {
    event.preventDefault();
    event.nativeEvent.dataTransfer!.dropEffect = "move";
  };

  return (
    <OnFileParsedContext.Consumer>
      {(addRows: (rows: ResultRows[]) => void) => (
        <div
          className="item"
          onDragOver={onDragOver}
          onDrop={async e => {
            e.preventDefault();

            const file = e.dataTransfer.files[0];
            const fileContent = await loadTextFile(file);
            switch (exchange) {
              case Exchange.BITSTAMP: {
                addRows(parseBitstampExport(fileContent));

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
