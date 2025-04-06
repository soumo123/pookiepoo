import mongoose from 'mongoose'


const userinformationSchema = new mongoose.Schema({

    user_id: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: ""
    },
    relationship_status: {
        type: Object,
        default: ""
    },
    height: {
        feet: {
            type: String,
            default: ""

        },
        inches: {
            type: String,
            default: ""

        }
    },
    languages: {
        type: Array,
        default: []

    },
    professionals: {
        type: Object,
        default: {}

    },
    sexual_orientation: {
        type: Array,
        default: []

    },

    show_age: {
        type: Boolean,
        default: false
    },
    interests: {
        type: Array,
        default: []

    },
    basics: {
        type: Object,
        default: {}
    },
    created_at: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('userinformation', userinformationSchema);