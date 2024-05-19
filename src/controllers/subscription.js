const { isEmailAddressExists, saveEmailAddress } = require('../managers/subscriptions');

exports.subscribe = async (ctx, next) => {
  const { email } = ctx.request.body;
  try {
    const existingSubscription = isEmailAddressExists(email);
    if (existingSubscription) {
      ctx.status = 409;
      ctx.body = { message: 'Email already subscribed' };
      await next();
    }

    await saveEmailAddress(email);
    ctx.status = 200;
    ctx.body = { message: 'Email subscribed successfully' };
  } catch (error) {
    console.error(error)
    ctx.status = 400;
    ctx.body = { error: 'Failed to subscribe email' };
  }
};
