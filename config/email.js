const email = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_PASSWORD;

module.exports = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: pass,
  },
  from: email,
  subject: 'Current USD to UAH Rate',
};
