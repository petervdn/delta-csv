import { Moment } from 'moment';

export type Price = {
    amount: number;
    currency: string;
}

export type ResultRows = {
    date: Moment,
    type:string,
    exchange: string;
    base: Price;
    quote?: Price;
    fee?: Price;
    costsProceeds?: Price;
    syncHoldings?: string;
    from?: string;
    to?: string;
    notes?: string;
}
