const express=require("express")
const mongoose = require('mongoose');
const dotenv=require("dotenv").config();
const app=express();
app.use(express.json());
app.use('/',require("./routes/personRoute"));
//Connect to the database using the following syntax:mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true }); 
mongoose.connect(process.env.MONGODB_URI,{
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongodb connected....');
  })
  .catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected...');
});

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log("server running on port 5000")
})


