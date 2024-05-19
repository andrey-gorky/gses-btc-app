const Router = require('koa-router');
const rateController = require('../controllers/rate');

const router = new Router();

router.get('/', rateController.getExchangeRate);

module.exports = router;
