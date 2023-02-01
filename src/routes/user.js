const {Router} =  require('express');
const userController = require('../controllers/user.controller.js')
const router = Router()

//Routes going here
router.get("/",(req,res)=>{
    res.status('200').send("connected to the base endpoint")
})


//API to Create a user
router.post("/",userController.createUser);


//Get a user with id
router.get("/:id",userController.getUser);

router.get("/healthz",(req,res)=>{
    res.status('200').send("connected to the base endpoint")
})

// export default router;
module.exports = router;