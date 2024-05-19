const Router = require('koa-router');
const subscriptionController = require('../controllers/subscription');
const emails = require('../managers/emails');

const router = new Router();

router.post('/', subscriptionController.subscribe);
router.get('/manual-mailing', subscriptionController.manualMailing);

module.exports = router;
