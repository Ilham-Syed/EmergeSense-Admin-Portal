import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

const connection = mongoose.createConnection(connectionString).on('open', () => {
    console.log('Database connected');
}).on('error', (error) => {
    console.log('Error', error);
});

export default connection;