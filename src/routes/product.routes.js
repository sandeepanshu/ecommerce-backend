const router = require("express").Router();
const { createProduct, getProducts } = require("../controllers/product.controller");

router.post("/", createProduct);
router.get("/", getProducts);

module.exports = router;
