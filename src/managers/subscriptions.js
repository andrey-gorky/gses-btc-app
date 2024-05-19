const Subscription = require("../models/Subscription");
module.exports = {
  /**
   * @param {String} email
   * @returns {Boolean}
   */
  isEmailAddressExists: async (email) => {
    try {
      return Boolean(await Subscription.findOne({ email }))
    } catch (e) {
      throw new Error(`Error :: isEmailAddressExists :: ${e.message}`);
    }
  },

  /**
   * Saves email address to mongo database
   * @param {String} email
   */
  saveEmailAddress: async (email) => {
    try {
      const newSubscription = new Subscription({ email });
      return await newSubscription.save();
    } catch (e) {
      throw new Error(`Error :: saveEmailAddress :: ${e.message}`);
    }
  },
};
