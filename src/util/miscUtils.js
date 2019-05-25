const fs = require("fs");

// const cols = ['Date','Type','Exchange','Base amount','Base currency','Quote amount','Quote currency','Fee','Fee currency','Costs/Proceeds','Costs/Proceeds currency','Sync Holdings','Sent/Received from','Sent to','Notes']

export const createDeltaLine = (
  date,
  type,
  exchange,
  amount,
  currency,
  quote,
  quoteCurrency,
  fee,
  feeCurrency,
  from,
  to,
  notes
) => {
  return `${date},${type},${exchange},${amount},${currency},${quote},${quoteCurrency},${fee},${feeCurrency},,,,${from ||
    ""},${to || ""},${notes || ""}`;
};
export const momentToDeltaTimeString = momentInstance => {
  return momentInstance.format("YYYY-MM-DD HH:MM:SS Z");
};
export const writeCsv = (lines, filename) => {
  // change extension to csv
  const splitName = filename.split(".");
  splitName[splitName.length - 1] = "csv";
  fs.writeFile(`converted/${splitName.join(".")}`, lines.join("\n"));
};
