const getExchangeRate = require('../managers/getExchangeRate');

exports.getExchangeRate = async (ctx, next) => {
  try {
    const rate = await getExchangeRate();
    if (rate) {
      ctx.status = 200;
      ctx.body = { rate };
      return next();
    }
  } catch (error) {
    console.error(error);
  }
  ctx.status = 400;
  ctx.body = { error: 'Failed to fetch rate' };
  return next();
};
