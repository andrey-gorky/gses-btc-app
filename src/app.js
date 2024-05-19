const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const { koaBody } = require('koa-body');
const rate = require('./routes/rate');
const subscription = require('./routes/subscription');
const emailJob = require('../jobs/emailJob');

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.use('/api/rate', rate.routes());
router.use('/api/subscribe', subscription.routes());

app.use(router.routes()).use(router.allowedMethods());

mongoose.connect('mongodb://mongo-btc-app:27017/gses-btc-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  console.info('Setting up email daily job...');
  emailJob.start();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
