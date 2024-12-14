const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;


const connection = mongoose.createConnection(connectionString).on('open',()=>{
    console.log('Database connected');
}).on('error',(error)=>{
    console.log('Error',error);
});

module.exports = connection;