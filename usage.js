const { getStockPrice, getHistoricalData, calculateSMA } = require('stock-price-checker');

// Get real-time stock price
getStockPrice('AAPL').then(data => console.log(data));

// Get historical data
getHistoricalData('AAPL', 'DAILY').then(data => {
  const historicalData = Object.values(data['Time Series (Daily)']);
  console.log(historicalData);

  // Calculate SMA
  const sma = calculateSMA(historicalData, 14);
  console.log(sma);
});
