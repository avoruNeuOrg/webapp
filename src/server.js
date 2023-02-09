// require('dotenv').config();

// const express = require("express");
// const morgan = require('morgan');
// const  helmet = require('helmet');
// const fs =require('fs');    
// const path = require('path');
// const routes = require('./routes');
// const {sequelize} = require('./models');

// const app=express();
// app.use(helmet());
// app.use(morgan('combined'));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))

 
// app.use('/v1/user',routes.userRoute)
// //app.use('/v1/product',routes.productRoute)

// app.get("/1",(req,res)=>{
//     res.status(200).send(`Opened the main page`)
// })
// app.get("/healthz",(req,res)=>{
//     res.status('200').send("connected to the base endpoint")
// })

// app.use((req,res)=>{
//     res.status(404).send('404:Page not found')
// })



// module.exports = app;


require('dotenv').config();

const express = require("express");
const morgan = require('morgan');
const  helmet = require('helmet');
const fs =require('fs');
const routes = require('./routes');
// import routes from './routes';
const {sequelize} = require('./models');



// import express from 'express';
// import morgan from 'morgan';
// import fs from 'fs';
// import path from 'path';
// import routes from './routes';
// import {sequelize} from './models'

const app=express();
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/v1/user',routes.userRoute)
app.use('/v1/product',routes.productRoute)

app.get("/1",(req,res)=>{
    res.status(200).send(`Opened the main page`)
})
app.get("/healthz",(req,res)=>{
    res.status('200').send("connected to the base endpoint")
})

app.use((req,res)=>{
    res.status(404).send('404:Page not found')
})

module.exports = app;
















