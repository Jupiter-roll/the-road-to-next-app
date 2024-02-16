import currency from 'currency.js';

export const displayCurrency = (cents: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency(cents, { fromCents: true }).value);
};
