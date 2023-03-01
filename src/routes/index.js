const express = require('express');
const route = express.Router();
const userRoute =  require('./user');
const productRoute =  require('./product');
// const imageRoute = require('./image');


route.use('/user', userRoute);
route.use('/product', productRoute);
// route.use('/image',imageRoute);

module.exports ={
    userRoute,
    productRoute,
}
