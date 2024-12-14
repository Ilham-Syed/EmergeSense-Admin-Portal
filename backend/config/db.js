import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectionString = process.env.MONGODB_URI;

dotenv.config();

const connection = mongoose.createConnection(connectionString).on('open',()=>{
    console.log('Database connected');
}).on('error',(error)=>{
    console.log('Error',error);
});

module.exports = connection; 