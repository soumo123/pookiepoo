import collections from '../collections/collections.js'
import mongoose from 'mongoose';
import { generateId } from '../utils/helper.js';
// import Error from '../errorCodes/errors.js'

const isValidCollection = (name) => {
    return Object.values(collections).includes(name);
};

const insertData = async (req, res) => {
    const { collection } = req.query;
    const data = req.body;

    if (!collection || !data) {
        return res.status(400).json({ msg: "Missing collection or data" });
    }

    if (!isValidCollection(collection)) {
        return res.status(400).json({ msg: `Invalid collection name: ${collection}` });
    }
    try {
        const Model = mongoose.connection.collection(collection);
        const user_id = await generateId(collection)
        const result = await Model.insertOne({...data,user_id});
        return res.status(200).send({ msg: "Data inserted",success:true });
    } catch (err) {
        return res.status(500).send({ msg: "Insert failed", error: err.message });
    }

}



export { insertData }


