//has every info about connecting to db
const db = require('../models/index.js')
const {User} = require('../models');


// Business Logic to get a user
exports.getUser = async(req,res) => {
    const {id}= req.params;
    const user= await  User.findOne({
        where:{
            id
        }
    });
    if(!user){
        return res.status(403).send("UserID not present")
    }

    res.send({
        message: 'This is working'})
}

// Business Logic to create a user
exports.createUser = async (req, res) => {
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
      let newUser = await User.create({
        first_name, 
        last_name,
        username,
        password,
      });
      var userObj = {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
        account_created: newUser.account_created,
        account_updated: newUser.account_updated,
      }
      
      //res.json({ users : userObj, status: "SUCCESS" });
      return res.status(201).send(userObj);
    } catch (err) {
      return res.status(400).send({
        message: `Error: ${err.message}`,
      });
    }
  };

