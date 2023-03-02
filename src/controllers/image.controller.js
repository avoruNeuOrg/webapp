//has every info about connecting to db
const db = require('../models/index.js')
const {Product} = require('../models');
const {User} = require('../models');
const {Image} = require('../models');
const validate = require('../services/validation.js');
const AWS = require('aws-sdk');
const path= require('path');
const fs = require('fs');

//TODO: 
// HOW TO PASS THE AWS CREDENTIALS TO CREATE S3 CLIENT 
// ALL THE CREDENTIALS AND BUCKET NAME ARE SENT TO TO THE 
// EC2 INSTANCE AS ENVIRONMENT VARIABLES IN THE TERRAFORM FILE 
// WHICH WILL BE USED TO CREATE THE S3 CLIENT
// AND THE IAM POLICY WILL GIVE ACCESS TO TALK TO S3 BUCKET


// PROCESS 
// 1 . CREATE THE WEB APPLICATION 
// 2 . PUSH THE WEBAPP CODE , WHICH RUNS THE PACKER TEMPLATE AND SHELL 
// SCRIPT TO CREATE THE AMI 
// 3 . USE THE ABOVE AMI TO CREATE THE EC2 INSTANCE IN THE TERRAFORM FILE
// 4 . USE THE TERRAFORM FILE TO CREATE THE S3 BUCKET AND IAM POLICY

//s3 client 
s3= new AWS.S3({
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //region: process.env.AWS_REGION,
    Bucket: process.env.AWS_BUCKET_NAME
});


//TODO :  CREATEIMAGE
//AUTHENTICATE THE USER 
//GET THE USER INFORMATION FROM THE AUTH HEADER
//CHECK IF THE USER IS THE OWNER OF THE PRODUCT
//IF YES THEN CREATE THE IMAGE ELSE RETURN 401
//CHECK FOR FILE EXTENSIONS - ONLY ALLOW JPG, PNG, GIF
//CHECK FOR FILE SIZE - ONLY ALLOW FILES LESS THAN 1MB
exports.createImage = async (req, res) => {
    // console.log(req.body);
    // console.log(req.params,"params");
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
        
    const file_name= req.file.filename;
    const productId= req.params.id;
    console.log(file_name," ::: file_name");    

    file_extension = req.file.mimetype;
    console.log(file_extension," ::: file_extension");

    if(file_extension != 'image/jpg' && file_extension != 'image/png' && file_extension != 'image/jpeg'){
        return res.status(400).send({'message':'Bad Request - File Extension'});
    }

    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });

    const user= await  User.findOne({
      where:{
        username:email
      }
  });
    
    if(product.owner_user_id != user.id){
        return res.status(401).send({'message':'Unauthorized'});
    }

    const key=file_name+'-userID-'+user.id+'-productID-'+productId;
    const fileStream =fs.createReadStream(req.file.path);

    try{  
        await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:key, 
            //Body: req.file.buffer,
            Body: fileStream,
            ContentType: req.file.mimetype,
            ACL: 'public-read'
        }).promise();
    }
    catch(err){
        console.log(err);
        return res.status(400).send({'message':'Bad Request - S3 Upload'});
    }

    try{
        const newImage = await Image.create({
            product_id:productId,
            file_name:file_name,
            s3_bucket_path:key,
        });
        return res.status(201).send({'message':'Image Created'});
    }
    catch(err){
        console.log(err);
        return res.status(400).send({'message':'Bad Request'});
    }
}    

//TODO : GETIMAGE
//AUTHENTICATE THE USER
//GET THE USER INFORMATION FROM THE AUTH HEADER
//CHECK IF THE PRODUCT IS PRESENT
//CHECK IF THE USER IS THE OWNER OF THE PRODUCT
//IF YES THEN GET THE LIST OF IMAGES ELSE RETURN 401
exports.getAllImages = async (req, res) => {
    productId= req.params.id;

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });

    const user= await  User.findOne({
      where:{
        username:email
      }
    });

    if(!product){
        return res.status(404).send({'message':'Not Found'});
    }
        
    if(product.owner_user_id != user.id){
        return res.status(401).send({'message':'Unauthorized'});
    }

    try{
        const images = await Image.findAll({
            where:{
                product_id:productId
            }
        });
        return res.status(200).send(images);    
    }catch(err){
        console.log(err);
        return res.status(400).send({'message':'Bad Request'});
    }
}



//TODO : GETIMAGE
//AUTHENTICATE THE USER
//GET THE USER INFORMATION FROM THE AUTH HEADER
//CHECK IF THE PRODUCT IS PRESENT
//CHECK IF THE USER IS THE OWNER OF THE PRODUCT
// IF YES THEN GET THE IMAGE ELSE RETURN 401 - UNAUTHORIZED
//CHECK IF PRODUCT ID IN PARAM = PRODUCT ID IN IMAGE
//IF YES THEN GET THE IMAGE ELSE RETURN 403 - FORBIDDEN
exports.getImage = async (req, res) => {
    productId= req.params.id;
    imageId= req.params.image_id;

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });

    const user= await  User.findOne({
      where:{
        username:email
      }
    });

    const image= await  Image.findOne({
        where:{
            image_id : imageId
        }
    });

    
    if(product.owner_user_id != user.id){
        return res.status(401).send({'message':'Unauthorized'});
    }

    if(image.product_id != productId){
        return res.status(403).send({'message':'Forbidden'});
    }

    try{
        return res.status(200).send(image);
    }catch(err){
        console.log(err);
        return res.status(400).send({'message':'Bad Request'});
    }
}




//TODO:
//AUTHENTICATE THE USER
//GET THE USER INFORMATION FROM THE AUTH HEADER
//CHECK IF THE PRODUCT IS PRESENT
//CHECK IF THE USER IS THE OWNER OF THE PRODUCT
// IF YES THEN DELETE THE IMAGE ELSE RETURN 401 - UNAUTHORIZED
//CHECK IF PRODUCT ID IN PARAM = PRODUCT ID IN IMAGE
//IF YES THEN DELETE THE IMAGE ELSE RETURN 403 - FORBIDDEN
exports.deleteImage = async (req, res) => {
    productId= req.params.id;
    imageId= req.params.image_id;

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });

    const user= await  User.findOne({
      where:{
        username:email
      }
    });

    const image= await  Image.findOne({
        where:{
            image_id:imageId
        }
    });

    if(!image){
        return res.status(404).send({'message':'Not Found'});
    }

    if(!product){
        return res.status(404).send({'message':'Not Found'});
    }

    if(!user){
        return res.status(401).send({'message':'Unauthorized'});
    }

    
    if(product.owner_user_id != user.id){
        return res.status(401).send({'message':'Unauthorized'});
    }

    if(image.product_id != productId){
        return res.status(403).send({'message':'Forbidden'});
    }

    try{
        await Image.destroy({
            where:{
                image_id:imageId
            }
        });
        s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: image.s3_bucket_path
        }).promise();
        return res.status(200).send({'message':'Image Deleted'});
    }catch(err){
        console.log(err);
        return res.status(400).send({'message':'Bad Request'});
    }
}
