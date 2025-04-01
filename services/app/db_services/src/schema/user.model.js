import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
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
    mobile:{
        type:Number,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String, 
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    location:{
        type:Object,
        required:true
    },
    interested_to:{
        type:Array,
        required:true
    },
    profile_pic:{
        type:String,
        required:true
    },
    additionalpictures:{
        type:Array,
        required:true
    },

    created_at: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    updated_at: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
})

export default mongoose.model('users',userSchema);