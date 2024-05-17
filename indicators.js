const _ = require('lodash');

function calculateSMA(data, window) {
  const prices = data.map((entry) => parseFloat(entry['1. open']));
  const sma = prices.map((price, index, prices) =>
    index >= window - 1 ? _.mean(prices.slice(index - window + 1, index + 1)) : null
  );
  return sma;
}

module.exports = {
  calculateSMA,
};

