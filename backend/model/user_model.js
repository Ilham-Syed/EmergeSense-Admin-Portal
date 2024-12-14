const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    uploads: [
        {
            imagePath: {
                type: String, // Path or URL of the uploaded image
                required: false
            },
            location: {
                latitude: {
                    type: Number, // Latitude of the location
                    required: false
                },
                longitude: {
                    type: Number, // Longitude of the location
                    required: false
                },
            },
            uploadedAt: {
                type: Date,
                default: Date.now // Automatically stores the upload timestamp
            },
            imageDescription: {
                type: String, // Description of the image
                required: false
            },
            severity:{
                type:String,
                required:false
            }
        }
    ]
})

userSchema.pre('save',async function(){
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
    }catch(e){
        console.log('Error',e);
    }
})

userSchema.methods.comparePassword=async function(password){
    try{
        return await bcrypt.compare(password,this.password);
    }catch(e){
        console.log('Error',e);
    }
}

const model= db.model('User',userSchema);

module.exports=model;