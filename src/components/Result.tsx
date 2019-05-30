import React from "react";
import moment from "moment";
import "../style/Result.css";
import { deltaMomentFormat } from "../util/miscUtils";
import { Price, ResultRows } from "../data/types";

// const skipColumns = [9, 10, 11, 14];
// const skipColumns = [-1];

const parseColumnContent = (row: number, col: number, content: string) => {
  if (row === 0) {
    const labels: { [key: string]: string } = {
      "Base amount": "amount",
      "Base currency": "curr",
      "Quote amount": "costs",
      "Quote currency": "curr",
      "Fee currency": "curr",
      "Sent/Received from": "from",
      Exchange: "Exch"
    };
    return labels[content] || content;
  } else {
    if (col === 0) {
      return moment(content, deltaMomentFormat).format("DD-MM-YYYY");
    }
  }

  return content;
};

const drawPriceCols = (price?: Price) =>
  price !== undefined ? (
    <>
      <td>{price.amount}</td>
      <td>{price.currency}</td>
    </>
  ) : (
    <>
      <td />
      <td />
    </>
  );

const Result = ({ rows }: { rows: ResultRows[] }) => {
  return (
    <div>
      <h3>Results</h3>
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.date.format("MM-DD-YYYY")}</td>
              <td>{row.type}</td>
              <td>{row.exchange}</td>
              {drawPriceCols(row.base)}
              {drawPriceCols(row.quote)}
              {drawPriceCols(row.fee)}
            </tr>
          ))}
          {/*{result.map((line, rowIndex) => {*/}
          {/*  return (*/}
          {/*    <tr*/}
          {/*      key={rowIndex}*/}
          {/*      style={{*/}
          {/*        color: rowIndex === 0 ? "#FFF" : "",*/}
          {/*        backgroundColor:*/}
          {/*          rowIndex === 0 ? "#444" : rowIndex % 2 ? "#eee" : ""*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {line*/}
          {/*        .split(",")*/}
          {/*        .filter(*/}
          {/*          (colContent, colIndex) => !skipColumns.includes(colIndex)*/}
          {/*        )*/}
          {/*        .map((colContent, colIndex) => (*/}
          {/*          <td key={`${colContent}-${colIndex}`}>*/}
          {/*            /!*{parseColumnContent(rowIndex, colIndex, colContent)}*!/*/}
          {/*            {colContent}*/}
          {/*          </td>*/}
          {/*        ))}*/}
          {/*    </tr>*/}
          {/*  );*/}
          {/*})}*/}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
