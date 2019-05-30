import { Price } from "../data/types";
import { Moment } from "moment";

// const fs = require("fs");

// const cols = ['Date','Type','Exchange','Base amount','Base currency','Quote amount','Quote currency','Fee','Fee currency','Costs/Proceeds','Costs/Proceeds currency','Sync Holdings','Sent/Received from','Sent to','Notes']

// export const createDeltaLine = (
//   date,
//   type,
//   exchange,
//   amount,
//   currency,
//   quote,
//   quoteCurrency,
//   fee,
//   feeCurrency,
//   from,
//   to,
//   notes
// ) => {
//   return `${date},${type},${exchange},${amount},${currency},${quote},${quoteCurrency},${fee},${feeCurrency},,,,${from ||
//     ""},${to || ""},${notes || ""}`;
// };

export const deltaMomentFormat = "YYYY-MM-DD HH:MM:SS Z";

export const momentToDeltaTimeString = (moment: Moment) =>
  moment.format(deltaMomentFormat);


export const showPrice = (price?: Price): string =>
  price !== undefined ? `${price.amount} ${price.currency}` : "";
