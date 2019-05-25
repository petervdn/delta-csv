import React from "react";
import moment from "moment";

const skipColumns = [9, 10, 11];

const parseColumnContent = (row, col, content) => {
  if (row > 0) {
    if (col === 0) {
      return moment(content).format("DD-MM YYYY");
    }
  }

  return content;
};

const Result = ({ result }) => {
  return (
    <div>
      <h3>Results</h3>
      <table>
        <tbody>
          {result.map((line, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {line
                  .split(",")
                  .filter(
                    (colContent, colIndex) => !skipColumns.includes(colIndex)
                  )
                  .map((colContent, colIndex) => (
                    <td key={`${colContent}-${colIndex}`}>
                      {parseColumnContent(rowIndex, colIndex, colContent)}
                    </td>
                  ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
