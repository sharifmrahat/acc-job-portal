const mongoose = require('mongoose')
const dotenv = require("dotenv").config()
const  app  = require('./app')


mongoose.connect(process.env.MONGODB_REMOTE, ()=> {
    console.log('Database is connected');
})

const port = process.env.PORT || 8080

app.listen(port, ()=> {
    console.log(`Your app in running on the port: ${port}`);
})
