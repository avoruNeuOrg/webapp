const app = require('./server.js');
async function main() {
    await sequelize.sync({force: true});
    await sequelize.authenticate();
}

main()
app.listen(3000,(req,res)=>{
    console.log(`Example App listening on ${process.env.PORT}`)
})