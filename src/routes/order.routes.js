const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { checkout } = require("../controllers/order.controller");

router.post("/checkout", auth, checkout);

module.exports = router;
