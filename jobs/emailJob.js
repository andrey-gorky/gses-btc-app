const cron = require('node-cron');
const emails = require('../src/managers/emails');

const job = cron.schedule('0 9 * * *', async () => {
  console.log('Running daily job to send USD to UAH rate to subscribers');
  await emails.send();
}, {
  scheduled: true,
  timezone: "Europe/Kiev"
});

module.exports = job;
