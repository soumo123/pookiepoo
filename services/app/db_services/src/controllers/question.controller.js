import collections from '../collections/collections.js'
import mongoose from 'mongoose';
import { generateId } from '../utils/helper.js';

const isValidCollection = (name) => {
    return Object.values(collections).includes(name);
};

const create = async (req, res) => {
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
        const ques_id = await generateId(collection,"QUE")
        const result = await Model.insertOne({...data,ques_id});
        return res.status(200).send({ msg: "Data added",success:true });
    } catch (err) {
        return res.status(500).send({ msg: "Insert failed", error: err.message });
    }

}

const getData = async (req, res) => {
    const { collection, query, category, sort = -1, limit = 10, offset = 0 } = req.query;

    if (!collection) {
        return res.status(400).json({ msg: "Missing collection name" });
    }

    if (!isValidCollection(collection)) {
        return res.status(400).json({ msg: `Invalid collection name: ${collection}` });
    }

    try {
        const Model = mongoose.connection.collection(collection);
        
        let filter = {};
        if (query) {
            filter.text = { $regex: query, $options: 'i' }; // Case-insensitive text search
        }
        if (category && category.trim() !== '') {
            filter.category = category;
        }
        const totalData = await Model.countDocuments(filter);
        const questions = await Model.find(filter)
            .sort({ _id: sort })
            .skip(Number(offset))
            .limit(Number(limit))
            .toArray();
        
        return res.status(200).json({ totalData, data: questions });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const updateData = async (req, res) => {
    const { collection } = req.query;
    const { ques_id, ...updateFields } = req.body;

    if (!collection || !ques_id || !updateFields) {
        return res.status(400).json({ msg: "Missing collection, ques_id, or data" });
    }

    if (!isValidCollection(collection)) {
        return res.status(400).json({ msg: `Invalid collection name: ${collection}` });
    }

    try {
        const Model = mongoose.connection.collection(collection);
        const result = await Model.updateOne(
            { ques_id },
            { $set: updateFields }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ msg: "No document found with the given ques_id" });
        }

        return res.status(200).json({ msg: "Data updated successfully", success: true });
    } catch (error) {
        return res.status(500).json({ msg: "Update failed", error: error.message });
    }
};

const deleteData = async (req, res) => {
    const { collection,ques_id } = req.query;

    if (!collection || !ques_id) {
        return res.status(400).json({ msg: "Missing collection or ques_id" });
    }

    if (!isValidCollection(collection)) {
        return res.status(400).json({ msg: `Invalid collection name: ${collection}` });
    }

    try {
        const Model = mongoose.connection.collection(collection);
        const result = await Model.deleteOne({ ques_id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ msg: "No document found with the given ques_id" });
        }

        return res.status(200).json({ msg: "Data deleted successfully", success: true });
    } catch (error) {
        return res.status(500).json({ msg: "Delete failed", error: error.message });
    }
};

export { create ,getData,updateData,deleteData}

