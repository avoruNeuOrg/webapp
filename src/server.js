import 'dotenv/config';

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

app.get("/1",(req,res)=>{
    res.status(200).send(`Opened the main page`)
})

app.use((req,res)=>{
    res.status(404).send('404:Page not found')
})

async function main() {
    await sequelize.sync({force: true});
    await sequelize.authenticate();
}

main()
app.listen(3000,(req,res)=>{
    console.log(`Example App listening on ${process.env.PORT}`)
})