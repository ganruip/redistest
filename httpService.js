var express = require('express');
var router = express.Router();

var user = require("./routes/users");
router.use('/shop/userService',user);

module.exports = router;