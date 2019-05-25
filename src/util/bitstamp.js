import loadTextFile from "./loadTextFile";
import moment from "moment";
import { createDeltaLine, momentToDeltaTimeString } from "./miscUtils";

function getDateFromLine(line) {
  const start = line.indexOf(',"') + 2;
  const end = line.indexOf('",');
  const date = line.substr(start, end - start);
  const m = moment(date, "MMM. DD, YYYY, hh:mm A");
  return momentToDeltaTimeString(m);
}
function removeDateFromLine(line) {
  const start = line.indexOf(',"') + 2;
  const end = line.indexOf('",');
  const date = line.substr(start, end - start);
  return line.replace(date, "DATE");
}

export const readBitstampExport = async file => {
  const fileContent = await loadTextFile(file);
  const lines = [];

  fileContent.split("\n").forEach(line => {
    // const splitLine = line.split(',');
    if (line.length) {
      const date = getDateFromLine(line);
      const lineWithoutDate = removeDateFromLine(line);
      const split = lineWithoutDate.split(",");

      const exchange = "Bitstamp";
      let type;
      let amount = split[3].split(" ")[0];
      let currency = split[3].split(" ")[1];
      let notes = "";
      let from = "";
      let to = "";
      let quote = "";
      let quoteCurrency = "";
      let fee = "";
      let feeCurrency = "";

      switch (split[0]) {
        case "Deposit": {
          if (currency === "EUR") {
            notes = "fiat deposit from bank";
            type = "DEPOSIT";
          } else if (currency === "ETH") {
            from = "Binance";
            to = "Bitstamp";
            type = "TRANSFER";
          }
          break;
        }
        case "Withdrawal": {
          if (currency === "ETH") {
            type = "TRANSFER";
            to = "Binance";
            from = "Bitstamp";
          }
          break;
        }
        case "Market": {
          type = split[7].toUpperCase().trim();
          quote = split[4].split(" ")[0];
          quoteCurrency = split[4].split(" ")[1];
          fee = split[6].split(" ")[0];
          feeCurrency = split[6].split(" ")[1];
        }
      }

      if (type === "TRANSFER") {
        notes = `transfer from ${from} to ${to}`;
      }

      if (type) {
        lines.push(
          createDeltaLine(
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
          )
        );
      } else {
        console.log("Skipping line:", line);
      }
    }
  });

  return lines;
};
