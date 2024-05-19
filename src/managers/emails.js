const getExchangeRate = require('./getExchangeRate');
const Subscription = require('../models/Subscription');
const emailConfig = require('../../config/email');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass
  }
});

module.exports = {
  send: async () => {
    const rate = await getExchangeRate();
    const subscribers = await Subscription.find({});
    if (!subscribers.length) {
      console.info('No subscribers where found!');
      return;
    }
    const mailOptions = {
      from: emailConfig.from,
      subject: emailConfig.subject,
      text: `The current USD to UAH rate is ${rate}`
    };

    subscribers.forEach(subscriber => {
      mailOptions.to = subscriber.email;
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email to ${subscriber.email}:`, error);
        } else {
          console.log(`Email sent to ${subscriber.email}:`, info.response);
        }
      });
    });
  },
}
