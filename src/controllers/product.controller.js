//has every info about connecting to db
const db = require('../models/index.js')
const {Product} = require('../models');
const {User} = require('../models');
const {Image} = require('../models');
// var bcrypt = require('bcryptjs');
// const user = require('../models/user.js');
const validate = require('../services/validation.js');
//const getUser = require('../services/getUserInfofromAuth.js');
const logger = require('../logger.js');
const statsd = require('../config/statsd.js');



//Business Logic to create a new Product 
exports.createProduct = async (req, res) => {
    var errors = validate.createProductValidation(req.body);

    logger.info("createProduct function called");
    statsd.increment('createProduct');
    
    if(errors.length>0){
        console.log(errors);
        return res.status(400).send({'message':'Bad Request'});
    } 
    
    // // try{
    // const owner = getUser.getUserInfoFromAuth(req.headers.authorization.split(' ')[1]);
    // console.log(owner);
    // // }
    // // catch(err){
    // //     console.log(err);
    // //     return res.status(400).send({'message':'Bad Request' , 'errors':err});
    // // }

    const { name, description, sku, manufacturer,quantity} = req.body;
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const user= await  User.findOne({
      where:{
        username:email
      }
  });

  try {
        const newProduct = await Product.create({
            name,
            description,
            sku,
            manufacturer,
            quantity,
            owner_user_id: user.id,
        });

        var productObj = {
            id: newProduct.id,
            name: newProduct.name,
            description: newProduct.description,
            sku: newProduct.sku,
            manufacturer: newProduct.manufacturer,
            quantity: newProduct.quantity,
            date_added: newProduct.date_added,
            date_last_updated: newProduct.date_last_updated,
            owner_user_id: newProduct.owner_user_id,
        }

        return res.status(201).send(productObj);
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: `Bad Request`,            
        });
}
};


//Business Logic to GET product details 
exports.getProduct = async (req, res) => {
  //TODO : what is 401 and 403 status when it needs no authentication
    const { id } = req.params;
    logger.info("getProduct function called");
    statsd.increment('getProduct');

    const product = await Product.findOne({
        where: {
            id,
        },
    });

    if (!product) {
        return res.status(404).send({
            message: ` Bad Request : Product ${id} not found!`,
        });
    }
    return res.status(200).send(product);
}




//Business Logic to DELETE product

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    logger.info("deleteProduct function called");
    statsd.increment('deleteProduct');

    // var errors = validate.paramValidation(req.params);
    // if(errors.length>0){
    //     console.log(errors);
    //     return res.status(400).send({'message':'Bad Request'});
    // }
    

    const product = await Product.findOne({
        where: {
            id
        },
    });

    if(!product){
        return res.status(404).send({
            message: ` Bad Request : Product ${id} not found!`,
        });
    }

    const images = await Image.findAll({
        where: {
            product_id: id
        },
    });


    //If user not authenticated then return 401

    //If user not authorised to delete the product then return 403
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const user= await  User.findOne({
      where:{
        username:email
      }
    });
  

    //Checking if the authenticated user is the owner of the product
    if(user.id !== product.owner_user_id){
        return res.status(403).send({
            message: `Forbidden : You are not the owner of the product`,
        });
    }

    try{
        await Product.destroy({
            where: {
                id
            },
        });
        for(var i=0;i<images.length;i++){
            await Image.destroy({
                where: {
                    id: images[i].id
                },
            });
        }
        return res.status(204).send();
    }catch(err){
        console.log(err);
        return res.status(400).send({
            message: `Bad Request`,
        });
    }
}



//Business Logic to PATCH product
exports.patchProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, sku, manufacturer,quantity} = req.body;
    const paramSet = new Set(['name', 'description', 'sku', 'manufacturer','quantity']);
    const bodySet = new Set(Object.keys(req.body));
    const diff = new Set([...bodySet].filter(x => !paramSet.has(x)));

    logger.info("patchProduct function called");
    statsd.increment('patchProduct');

    if (diff.size > 0) {
        return res.status(400).send({
            message: `Bad Request : Invalid parameters ${[...diff]}`,
        });
    }

    const product = await Product.findOne({
        where: {
            id
        },
    });

    if (!product) {
        return res.status(400).send({
            message: ` Bad Request : Product ${id} not found!`,
        });
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const user= await  User.findOne({
      where:{
        username:email
      }
  });
  

    //Checking if the authenticated user is the owner of the product
    if(user.id !== product.owner_user_id){
        return res.status(403).send({
            message: `Forbidden : You are not the owner of the product`,
        });
    }

    try{
        if(name){
            product.name = name;
        }
        if(description){
            product.description = description;
        }
        if(sku){
            product.sku = sku;
        }
        if(manufacturer){
            product.manufacturer = manufacturer;
        }
        if(quantity){
            product.quantity = quantity;
        }
        product.date_last_updated = new Date();
        await product.save();
        return res.status(204).json();
    }catch(err){
        console.log(err);
        return res.status(400).send({
            message: `Bad Request`,
        }).json();
    }
}



//Business Logic to update product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    logger.info("updateProduct function called");
    statsd.increment('updateProduct');

    //TODO: validate the request body- write down multiple case scenarios
    const { name, description, sku, manufacturer,quantity} = req.body;
    var errors = validate.createProductValidation(req.body);
    
    if(errors.length>0){
        console.log(errors);
        return res.status(400).send({'message':'Bad Request'});
    } 

    const product = await Product.findOne({
        where: {
            id
        },
    });

    if (!product) {
        return res.status(404).send({
            message: ` Bad Request : Product ${id} not found!`,
        });
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const user= await  User.findOne({
      where:{
        username:email
      }
  });
  

    //Checking if the authenticated user is the owner of the product
    if(user.id !== product.owner_user_id){
        return res.status(403).send({
            message: `Forbidden`,
        });
    }

    console.log("product details :: ",product);

    try{
        const updatedProduct = await Product.update({
            name,
            description,
            sku,
            manufacturer,
            quantity ,
            date_last_updated: new Date(),
        }, {
            where: {
                id,
            },
        });
        return res.status(204).json();

    }catch(err){
        console.log(err);
        return res.status(400).send({
            message: `Bad Request`,            
        });
    }
}


