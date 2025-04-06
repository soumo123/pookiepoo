import collections from '../collections/collections.js'
import mongoose from 'mongoose';
import { generateId } from '../utils/helper.js';
import DataEncryption from '../utils/decrypt.js';
import dotenv from 'dotenv'
dotenv.config()

// import Error from '../errorCodes/errors.js'
const crypto = new DataEncryption(process.env.SECRET_KEY)


const isValidCollection = (name) => {
    return Object.values(collections).includes(name);
};

const insertData = async (req, res) => {
    const { collection } = req.query;
    const data = req.body;
    let result = undefined

    if (!collection || !data) {
        return res.status(400).json({ msg: "Missing collection or data" });
    }

    if (!isValidCollection(collection)) {
        return res.status(400).json({ msg: `Invalid collection name: ${collection}` });
    }
    try {
        const Model = mongoose.connection.collection(collection);
        const Model1 = mongoose.connection.collection("userinformation");
        const user_id = await generateId(collection,"USER")

        data.firstname = crypto.encrypt(data.firstname)
        data.lastname = crypto.encrypt(data.lastname)
        data.mobile = crypto.encrypt(data.mobile)
        data.email = crypto.encrypt(data.email)
        data.password = crypto.encrypt(data.password)
        data.location = JSON.parse(data.location)
        data.created_at = new Date()
        data.updated_at = new Date()

         result = await Model.insertOne({...data,user_id});
        result = await Model1.insertOne({
            user_id:user_id,
            about:"",
            relationship_status:{},
            height:{
                feet:"",
                inches:""
            },
            languages:[],
            professionals:{

            },
            sexual_orientation:[],
            show_age:false,
            interests:[],
            basics:{},
            created_at:new Date(),
            updated_at:new Date()
        });
        return res.status(200).send({ msg: "Data inserted",success:true });
    } catch (err) {
        return res.status(500).send({ msg: "Insert failed", error: err.message });
    }

}



export { insertData }


