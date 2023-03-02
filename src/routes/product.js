const {Router} =  require('express');
const productController = require('../controllers/product.controller.js')
const imageControlller = require('../controllers/image.controller.js')
const router = Router()
const BasicAuth = require('../authentication/BasicAuth');
const productUserAuth = require('../services/productUserAuth.js');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


//Routes go here
router.post("/", BasicAuth, productController.createProduct);

router.get("/:id", productController.getProduct);

router.put("/:id", productUserAuth, productController.updateProduct);


router.delete("/:id", productUserAuth, productController.deleteProduct);

router.patch("/:id", productUserAuth, productController.patchProduct);

router.post("/:id/image" , upload.single(), imageControlller.createImage);

router.get("/:id/image", imageControlller.getAllImages);

router.get("/:id/image/:image_id", imageControlller.getImage);

router.delete("/:id/image/:image_id", imageControlller.deleteImage);

module.exports = router;