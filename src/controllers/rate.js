const axios = require('axios');

exports.getRate = async (ctx) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const rate = response.data.rates.UAH;
    ctx.status = 200;
    ctx.body = rate;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to fetch rate' };
  }
};
