var router = require('express').Router();

var registerController = require('../controller/accounts/register.js');
var loginController = require('../controller/accounts/login.js');

router.post('/register', registerController);
router.use('/login', loginController);

module.exports = router;
