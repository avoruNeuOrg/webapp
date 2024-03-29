const { User } = require('../models');
const bcrypt = require("bcrypt");

const productUserAuth = async (req, res, next) => {
    // check if authorization header is present
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).send({
            message: 'UnAuthorised'
        })
    }
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    // if email and password are null
    if (email == "" || password == "") {
        return res.status(401).json({
            message: 'UnAuthorised'
        })
    }

    //get user with emailid
    const user = await User.findOne({ where: { username: email } });
    // If the user is not found - then it is UnAuthorised access
    if (!user) {
        return res.status(401).json({
            message: 'UnAuthorised'
        })
    }

    // verify password
    // const isPasswordMatch = await user.password === password;
    const isPasswordMatch =  bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
        console.log("Password not match");
        return res.status(401).json({
            message: ' UnAuthorized'
        })
    }
    
    // authentication successful
    next();
};

module.exports  = productUserAuth;