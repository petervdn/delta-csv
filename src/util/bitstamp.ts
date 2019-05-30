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

export const parseBitstampExport = (fileContent: string): ResultRows[] => {
  const rows: ResultRows[] = [];

  fileContent.split("\n").forEach((line, index) => {
    if (index === 0) return; // header csv info

    if (line.length) {
      console.log(line);
      const date = getDateFromLine(line);
      const lineWithoutDate = removeDateFromLine(line);
      const split = lineWithoutDate.split(",");

      const exchange = "Bitstamp";
      let type: string = "";

      let base = split[3];
      let baseAmount = base ? parseFloat(base.split(" ")[0]) : undefined;
      let baseCurrency = base ? base.split(" ")[1] : undefined;

      const quote = split[4];
      let quoteAmount = quote ? parseFloat(quote.split(" ")[0]) : undefined;
      let quoteCurrency = quote ? quote.split(" ")[1] : undefined;

      const fee = split[6];
      let feeAmount = fee ? parseFloat(fee.split(" ")[0]) : undefined;
      let feeCurrency = fee ? fee.split(" ")[1] : undefined;

      switch (split[0]) {
        case "Deposit": {
          type = baseCurrency === "EUR" ? "DEPOSIT" : "TRANSFER";
          break;
        }
        case "Withdrawal": {
          type = baseCurrency === "EUR" ? "WITHDRAW" : "TRANSFER";
          break;
        }
        case "Market": {
          type = split[7].toUpperCase().trim(); /// buy or sell
          break;
        }
        default: {
          console.warn(`Unhandled item ${split[0]}`);
        }
      }

      if (type) {
        rows.push({
          type,
          date,
          exchange,
          base: {
            amount: baseAmount!,
            currency: baseCurrency!
          },
          quote: quote
            ? {
                amount: quoteAmount!,
                currency: quoteCurrency!
              }
            : undefined,
          fee: fee
            ? {
                amount: feeAmount!,
                currency: feeCurrency!
              }
            : undefined
        });
      } else {
        console.log("Skipping line:", line);
      }
    }
  });

  return rows;
};
