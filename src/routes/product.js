const {Router} =  require('express');
const productController = require('../controllers/product.controller.js')
const router = Router()
const BasicAuth = require('../authentication/BasicAuth');
const ProductUserAuth = require('../services/ProductUserAuth.js');

//Routes go here
router.post("/", BasicAuth, productController.createProduct);

router.get("/:id", productController.getProduct);

router.put("/:id", ProductUserAuth, productController.updateProduct);


router.delete("/:id", ProductUserAuth, productController.deleteProduct);

router.patch("/:id", ProductUserAuth, productController.patchProduct);
module.exports = router;