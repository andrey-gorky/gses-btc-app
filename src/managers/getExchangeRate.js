const axios = require("axios");
module.exports = async () => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response?.data?.rates?.UAH || null;
  } catch (e) {
    throw new Error(`Error :: getExchangeRate :: ${e.message}`);
  }
};
