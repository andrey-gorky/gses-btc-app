const getExchangeRate = require('../managers/getExchangeRate');

exports.getExchangeRate = async (ctx, next) => {
  let body = { error: 'Failed to fetch rate' };
  try {
    const rate = await getExchangeRate();
    if (rate) {
      ctx.status = 200;
      ctx.body = { rate };
      await next()
    }
  } catch (error) {
    console.error(error);
  }

  ctx.status = 400;
  ctx.body = body;
};
