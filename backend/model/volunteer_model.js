import mongoose from 'mongoose';
import db from '../config/db.js';

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Volunteer = db.model('Volunteer', volunteerSchema);

export default Volunteer;