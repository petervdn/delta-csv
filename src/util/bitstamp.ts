import loadTextFile from "./loadTextFile";
import moment, { Moment } from "moment";
import { ResultRows } from "../data/types";

function getDateFromLine(line: string): Moment {
  const start = line.indexOf(',"') + 2;
  const end = line.indexOf('",');
  const date = line.substr(start, end - start);
  return moment(date, "MMM. DD, YYYY, hh:mm A");
}
function removeDateFromLine(line: string): string {
  const start = line.indexOf(',"') + 1;
  const end = line.indexOf('",') + 1;
  const date = line.substr(start, end - start);
  return line.replace(date, "DATE");
}

export const readBitstampExport = async (file: File): Promise<ResultRows[]> => {
  const fileContent = await loadTextFile(file);
  const rows: ResultRows[] = [];

  fileContent.split("\n").forEach((line, index) => {
    if (index === 0) return;
    // const splitLine = line.split(',');
    if (line.length) {
      console.log(line);
      const date = getDateFromLine(line);
      const lineWithoutDate = removeDateFromLine(line);
      const split = lineWithoutDate.split(",");
      // console.log(lineWithoutDate);
      // console.log(lineWithoutDate);
      console.log("");

      const exchange = "Bitstamp";
      let type: string = "";
      let amount: number = parseFloat(split[3].split(" ")[0]);
      let currency = split[3].split(" ")[1];
      // let notes = "";
      // let from = "";
      // let to = "";
      let quote: number | undefined;
      let quoteCurrency = "";
      let fee: number | undefined;
      let feeCurrency = "";

      switch (split[0]) {
        case "Deposit": {
          if (currency === "EUR") {
            // notes = "fiat deposit from bank";
            type = "DEPOSIT";
            // } else if (currency === "ETH") {
            // from = "Binance";
            // to = "Bitstamp";
          } else {
            type = "TRANSFER";
            console.warn("Unhandled currency", currency);
          }
          break;
        }
        case "Withdrawal": {
          type = "TRANSFER";
          // if (currency === "ETH") {
          //   // type = "TRANSFER";
          //   // to = "Binance";
          //   // from = "Bitstamp";
          // } else {
          //   console.warn("Unhandled currency", currency);
          // }
          break;
        }
        case "Market": {
          type = split[7].toUpperCase().trim();
          quote = parseFloat(split[4].split(" ")[0]);
          quoteCurrency = split[4].split(" ")[1];
          fee = parseFloat(split[6].split(" ")[0]);
          feeCurrency = split[6].split(" ")[1];
          break;
        }
        default: {
          console.warn(`Unhandled item ${split[0]}`);
        }
      }

      // if (type === "TRANSFER") {
      // notes = `transfer from ${from} to ${to}`;
      // notes = 'transfer';
      // }

      if (type !== undefined) {
        rows.push({
          type,
          date,
          exchange,
          base: {
            amount,
            currency
          },
          quote:
            quote !== undefined
              ? {
                  amount: quote,
                  currency: quoteCurrency
                }
              : undefined,
          fee:
            fee !== undefined
              ? {
                  amount: fee,
                  currency: feeCurrency
                }
              : undefined
        });
        // lines.push(
        //   createDeltaLine(
        //     date,
        //     type,
        //     exchange,
        //     amount,
        //     currency,
        //     quote,
        //     quoteCurrency,
        //     fee,
        //     feeCurrency,
        //     from,
        //     to,
        //     notes
        //   )
        // );
      } else {
        console.log("Skipping line:", line);
      }
    }
  });

  return rows;
};
