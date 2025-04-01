import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({

    ques_id:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    multiSelect:{
        type:Boolean,
        default:false
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

export default mongoose.model('questions',questionSchema);