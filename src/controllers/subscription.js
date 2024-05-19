const { isEmailAddressExists, saveEmailAddress } = require('../managers/subscriptions');
const emails = require('../managers/emails');

module.exports = {
  subscribe: async (ctx, next) => {
    const { email } = ctx.request.body;
    try {
      const existingSubscription = await isEmailAddressExists(email);
      if (existingSubscription) {
        ctx.status = 409;
        ctx.body = { message: 'Email already subscribed' };
        return next();
      }

      await saveEmailAddress(email);
      ctx.status = 200;
      ctx.body = { message: 'Email subscribed successfully' };
      return next ();
    } catch (error) {
      console.error(error)
      ctx.status = 400;
      ctx.body = { error: 'Failed to subscribe email' };
      return next();
    }
  },

  manualMailing: async (ctx, next) => {
    try {
      await emails.send();
      ctx.status = 200;
      ctx.body = { message: 'Ok' };
      return next();
    } catch (e) {
      console.error(e);
      ctx.status = 400;
      ctx.body = { error: 'Oops, Something went wrong!' };
      return next();
    }
  },
};
