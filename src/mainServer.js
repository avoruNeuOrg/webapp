require('dotenv').config();
const {sequelize} = require('./models');
const app = require('./server.js');
const multer = require('multer');



async function main() {
    await sequelize.sync({});
    await sequelize.authenticate();
}

main()
app.listen(4000,(req,res)=>{
    console.log(`Example App listening on ${process.env.PORT}`)
})

 