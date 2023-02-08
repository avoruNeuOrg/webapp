const {Router} =  require('express');
const productController = require('../controllers/product.controller.js')
const router = Router()
const BasicAuth = require('../authentication/BasicAuth');


//Routes go here
router.post("/", BasicAuth, productController.createProduct);

router.get("/:id", productController.getProduct);

router.put("/:id", BasicAuth, productController.updateProduct);


module.exports = router;