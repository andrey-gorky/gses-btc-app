const Subscription = require('../models/Subscription');

exports.subscribe = async (ctx) => {
  const { email } = ctx.request.body;
  try {
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      ctx.status = 409;
      ctx.body = { message: 'Email already subscribed' };
      return;
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    ctx.status = 200;
    ctx.body = { message: 'Email subscribed successfully' };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to subscribe email' };
  }
};
