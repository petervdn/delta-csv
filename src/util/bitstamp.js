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
  const start = line.indexOf(',"') + 1;
  const end = line.indexOf('",') + 1;
  const date = line.substr(start, end - start);
  return line.replace(date, "DATE");
}

export const readBitstampExport = async file => {
  const fileContent = await loadTextFile(file);
  const lines = [];

  fileContent.split("\n").forEach((line, index) => {
    if(index ===0) return;
    // const splitLine = line.split(',');
    if (line.length) {
      const date = getDateFromLine(line);
      const lineWithoutDate = removeDateFromLine(line);
      const split = lineWithoutDate.split(",");
    console.log(lineWithoutDate);
    // console.log(lineWithoutDate);
    console.log('');

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
            // type = "DEPOSIT";
          } else if (currency === "ETH") {
            // from = "Binance";
            // to = "Bitstamp";
            type = "TRANSFER";
          } else {
            console.warn('Unhandled currency', currency);
          }
          break;
        }
        case "Withdrawal": {
          if (currency === "ETH") {
            type = "TRANSFER";
            // to = "Binance";
            // from = "Bitstamp";
          } else {
            console.warn('Unhandled currency', currency);
          }
          break;
        }
        case "Market": {
          type = split[7].toUpperCase().trim();
          quote = split[4].split(" ")[0];
          quoteCurrency = split[4].split(" ")[1];
          fee = split[6].split(" ")[0];
          feeCurrency = split[6].split(" ")[1];
          break;
        }
        default: {
          console.warn(`Unhandled item ${split[0]}`);
        }
      }

      if (type === "TRANSFER") {
        // notes = `transfer from ${from} to ${to}`;
        notes = 'transfer';
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
