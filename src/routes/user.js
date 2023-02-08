const {Router} =  require('express');
const userController = require('../controllers/user.controller.js')
const router = Router()
const BasicAuth = require('../authentication/BasicAuth');

//Routes going here
router.get("/",(req,res)=>{
    res.status('200').send("connected to the base endpoint")
})

//API to Create a user
router.post("/", userController.createUser);

//Get a user with id
router.get("/:id", BasicAuth, userController.getUser);

//API to modify user details 
router.put("/:id",BasicAuth, userController.updateUser);

// export default router;
module.exports = router;