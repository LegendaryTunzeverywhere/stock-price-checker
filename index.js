const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

async function getStockPrice(symbol) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '1min',
        apikey: API_KEY,
      },
    });
    const data = response.data;
    if (data['Time Series (1min)']) {
      const latestTime = Object.keys(data['Time Series (1min)'])[0];
      const latestPrice = data['Time Series (1min)'][latestTime]['1. open'];
      return {
        symbol: symbol,
        price: latestPrice,
        timestamp: latestTime,
      };
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error(`Error fetching stock price for ${symbol}:`, error.message);
    return null;
  }
}

async function getHistoricalData(symbol, interval = 'DAILY') {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: `TIME_SERIES_${interval.toUpperCase()}`,
        symbol: symbol,
        apikey: API_KEY,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error.message);
    return null;
  }
}

module.exports = {
  getStockPrice,
  getHistoricalData,
};

