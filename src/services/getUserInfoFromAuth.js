const db = require('../models/index.js')
const {Product} = require('../models');
const {User} = require('../models');
var bcrypt = require('bcryptjs');
const user = require('../models/user.js');
const validate = require('../services/validation.js');

const getUserInfoFromAuth = async (data) => {
    var errorMessages = []
    var inputParams = ['username','password'];
    var paramSet = new Set(inputParams);
    if(Object.keys(data).length!=inputParams.length){
        errorMessages.push('Payload seems to different please send correct payload');
    }
    else{
        Object.keys(data).forEach(e=>{
            if(!paramSet.has(e))
            {
                errorMessages.push('Payload seems to different please send correct payload');
            }
        })
    }
    const base64Credentials = data;
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    const user= await User.findOne({
        where:{
          username:email
        }
    });

    return user;
}

module.exports = {
    getUserInfoFromAuth: getUserInfoFromAuth
}


