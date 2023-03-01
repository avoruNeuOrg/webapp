const {Router} =  require('express');
const imageController = require('../controllers/image.controller.js')
const router = Router()
const BasicAuth = require('../authentication/BasicAuth');
const productUserAuth = require('../services/productUserAuth.js');




//Routes go here
router.post("/", imageController.createImage);