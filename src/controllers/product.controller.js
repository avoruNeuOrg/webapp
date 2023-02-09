//has every info about connecting to db
const db = require('../models/index.js')
const {Product} = require('../models');
const {User} = require('../models');
var bcrypt = require('bcryptjs');
const user = require('../models/user.js');
const validate = require('../services/validation.js');
//const getUser = require('../services/getUserInfofromAuth.js');


//Business Logic to create a new Product 
exports.createProduct = async (req, res) => {
    var errors = validate.createProductValidation(req.body);
    
    if(errors.length>0){
        console.log(errors);
        return res.status(400).send({'message':'Bad Request' , 'errors':errors});
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



//Business Logic to update product
exports.updateProduct = async (req, res) => {
  //TODO: validate the request body- write down multiple case scenarios

   
}