const mongoose = require('mongoose');
require('dotenv').config({path:'./config.env'})

const connectDatabasae = () => {
    mongoose.connect(process.env.DB_URL, {

        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`MongoDB connected with server sucessfully`)
      console.log("All things looks good")  
    }).catch((error)=>{
        console.log(error);
    })
}

module.exports=connectDatabasae;