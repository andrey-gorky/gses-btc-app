const Router = require('koa-router');
const subscriptionController = require('../controllers/subscription');

const router = new Router();

router.post('/', subscriptionController.subscribe);

module.exports = router;
