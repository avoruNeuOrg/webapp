const {Router} =  require('express');
const productController = require('../controllers/product.controller.js')
const router = Router()
const BasicAuth = require('../authentication/BasicAuth');
const productUserAuth = require('../services/productUserAuth.js');

//Routes go here
router.post("/", BasicAuth, productController.createProduct);

router.get("/:id", productController.getProduct);

router.put("/:id", productUserAuth, productController.updateProduct);


router.delete("/:id", productUserAuth, productController.deleteProduct);

router.patch("/:id", productUserAuth, productController.patchProduct);
module.exports = router;