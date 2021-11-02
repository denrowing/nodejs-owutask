const router = require('express').Router();

const { appartmentController } = require('../controllers/index')

router.get('/', appartmentController.getAllFreeAppartments);

module.exports = router;
