const express = require('express');
const route = express.Router();
const userRoute =  require('./user');
const productRoute =  require('./product');

route.use('/user', userRoute);
route.use('/product', productRoute);

module.exports ={
    userRoute,
    productRoute
}
