var express = require('express');
var router = express.Router();
var VC = require('../controllers/viewOrder')

/* GET home page. */
router.post('/', VC.createViewOrder);
router.get('/find/:id', VC.getViewOrderById);
router.get('/', VC.getAllViewOrders);
router.patch('/:id', VC.updateViewOrder);
router.delete('/:id', VC.deleteViewOrder);

module.exports = router;
