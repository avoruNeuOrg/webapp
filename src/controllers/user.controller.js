//has every info about connecting to db
const db = require('../models/index.js')
const {User} = require('../models');
var bcrypt = require('bcryptjs');
const user = require('../models/user.js');
const validate = require('../services/validation.js');
const logger = require('../logger.js');
const statsd = require('../config/statsd.js');

// Business Logic to get a user
exports.getUser = async(req,res) => {
    const errors = validate.validateGet(req.body);
    
    logger.info("getUser function called");
    statsd.increment('getUser');

    if(errors.length>0){
      return res.status(400).json({errors: errors});
    }
    const {id}= req.params;
    const user= await  User.findOne({
        where:{
            id
        }
    });

    if(!user){
        return res.status(403).send("Forbidden : UserID not present")
    }

    if(user.id!=id){
        return res.status(403).send("Forbidden")
    }

    var userObj = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      account_created: user.account_created,
      account_updated: user.account_updated,
    }

    return res.status(200).send(userObj);
}


// Business Logic to create a user
exports.createUser = async (req, res) => {
    var errors = validate.createValidation(req.body);
    
    logger.info("createUser function called");
    statsd.increment('createUser');

    if(errors.length>0){
        return res.status(400).json({errors: errors});
    }
    const { first_name,last_name,username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        message: 'Please provide a username and a password to create a user!',
      });
    }

    let usernameExists = await User.findOne({
      where: {
        username,
      },
    });
  
    if (usernameExists) {
      return res.status(400).send({
        message: 'An account with that username already exists!',
      });
    }
  
    try {
       // console.log(usernameExists);
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password,salt);
        let newUser = await User.create({
        first_name, 
        last_name,
        username,
        password: hash,
      });
      var userObj = {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
        account_created: newUser.account_created,
        account_updated: newUser.account_updated,
      }
      //console.log(newUser);
      //res.json({ users : userObj, status: "SUCCESS" });
      return res.status(201).send(userObj);
    } catch (err) {
      return res.status(400).send({
        message: `Error: ${err.message}`,
      });
    }
  };


  //Business Logic to update user
  exports.updateUser = async (req, res) => {
    
    logger.info("updateUser function called");
    statsd.increment('updateUser');

    const errors = validate.validateUpdate(req.body);
    if(errors.length>0){
        return res.status(400).json({errors: errors});
    }
    const { first_name, last_name, username, password } = req.body;
    const { id } = req.params;
  
    const user = await User.findOne({
      where: {
        id,
      },
    });
  
    if (!user) {
      return res.status(403).send({
        message: `Forbidden`,
      });
    }  

    if (user.username != username) {
      return res.status(400).send({
        message: `Forbidden`,
      })
    };

    try {
        if (first_name) {
        user.first_name = first_name;
        }
        if (last_name) {
        user.last_name = last_name;
        }
      if (password) {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password,salt);
        user.password = hash;
      }
      user.save();
      return res.status(204).send({
        message: `User ${id} has been updated!`,
      });
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  };




