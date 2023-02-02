const { User } = require('../models');
const bcrypt = require("bcrypt");

const BasicAuth = async (req, res, next) => {
    // check if authorization header is present
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({
            message: 'Missing Authorization Header'
        })
    }
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    // if email and password are null
    if (email == "" || password == "") {
        return res.status(400).json({
            message: 'Bad Request'
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
            message: 'Invalid Authentication Credentials, Please try again'
        })
    }

    // verify if user is trying to access his own account
    if (req.params.id){
        //console.log(`the user id is ${user.id} , params id is ${req.params.id}`)
        if (user.id != req.params.id) {
            return res.status(403).json({
                message: 'Forbidden Resource'
            }),
                console.log("Forbidden :UserID did not match");
        }
    }

    // authentication successful
    next();
}

module.exports = BasicAuth;