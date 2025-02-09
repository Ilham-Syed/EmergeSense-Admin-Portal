import mongoose from 'mongoose';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const uploadSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'audio'], // Defines whether the upload is an image or audio
        required: true
    },
    filePath: {
        type: String, // Path or URL of the uploaded file
        required: function () { return this.type === 'image'; }
    },
    location: {
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        }
    },
    uploadedAt: {
        type: Date,
        default: Date.now // Automatically stores the upload timestamp
    },
    description: {
        type: String, // For image description or extra notes
        required: false
    },
    severity: {
        type: String, // Only relevant for image uploads
        required: function () { return this.type === 'image'; } // Required only if type is 'image'
    },
    transcript: {
        type: String, // Stores transcribed text for audio uploads
        required: function () { return this.type === 'audio'; } // Required only if type is 'audio'
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensuring emails are unique
    },
    password: {
        type: String,
        required: true
    },
    uploads: [uploadSchema] // Embedding the uploadSchema for storing uploads
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash password if it's modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.log('Error hashing password:', error);
        next(error);
    }
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log('Error comparing password:', error);
        return false;
    }
};

const User = db.model('User', userSchema);

export default User;
