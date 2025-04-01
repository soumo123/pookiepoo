import mongoose from 'mongoose'


const userinformationSchema = new mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    about:{
        type:String
    },
    relationship_status:{
        type:Object  
    },
    height:{
        feet:{
            type:String
        },
        inches:{
            type:String
        }
    },
    languages:{
        type:Array
    },
    professionals:{
        type:Object
    },
    sexual_orientation:{
        type:Array
    },

    show_age:{
        type:Boolean
    },
    interests:{
        type:Array
    },
    basics:{
        type:Object
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

export default mongoose.model('userinformation',userinformationSchema);