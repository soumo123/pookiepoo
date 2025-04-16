import collections from '../collections/collections.js'
import mongoose from 'mongoose';
import { generateId } from '../utils/helper.js';
import DataEncryption from '../utils/decrypt.js';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
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
        const user_id = await generateId(collection, "USER")

        data.firstname = crypto.encrypt(data.firstname)
        data.lastname = crypto.encrypt(data.lastname)
        data.mobile = crypto.encrypt(data.mobile)
        // data.email = crypto.encrypt(data.email)
        data.password = crypto.encrypt(data.password)
        data.location = JSON.parse(data.location)
        data.created_at = new Date()
        data.updated_at = new Date()

        result = await Model.insertOne({ ...data, user_id });
        result = await Model1.insertOne({
            user_id: user_id,
            about: "",
            relationship_status: {},
            height: {
                feet: "",
                inches: ""
            },
            languages: [],
            professionals: {

            },
            sexual_orientation: [],
            show_age: false,
            interests: [],
            basics: {},
            created_at: new Date(),
            updated_at: new Date()
        });
        return res.status(200).send({ msg: "Data inserted", success: true });
    } catch (err) {
        return res.status(500).send({ msg: "Insert failed", error: err.message });
    }

}

const signin = async (req, res) => {
    const { collection } = req.query;
    const { email, password } = req.body;

    if (!collection || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    try {
        if (!isValidCollection(collection)) {
            return res.status(400).json({ success: false, message: `Invalid collection: ${collection}` });
        }

        const Model = mongoose.connection.collection(collection);

        // Find the user by email
        const user = await Model.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Email not found" });
        }

        // Decrypt password and compare
        const decryptedPassword = crypto.decrypt(user.password);
        if (decryptedPassword !== password) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const payload = {
            user_id: user.user_id,
            email: user.email,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
        });

        return res.status(200).json({
            success: true,
            message: "Sign-in successful",
            data: {
                accessToken,
                refreshToken,
                user: {
                    email: user.email,
                    user_id: user.user_id,
                    firstname: crypto.decrypt(user.firstname),
                    lastname: crypto.decrypt(user.lastname),
                    profile_pic: user.profile_pic?.url || null
                }
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error during sign-in",
            error: err.message
        });
    }
};

const refreshToken = (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(401).json({ success: false, message: 'Refresh token missing' });

    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign({
            user_id: userData.user_id,
            email: userData.email
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' });

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired refresh token',
            error: err.message
        });
    }
};

const userProfile = async (req, res) => {
    const { collection, user_id } = req.query;
    if (!collection) {
        return res.status(400).json({ msg: "Missing collection or data" });
    }

    if (!isValidCollection(collection)) {
        return res.status(400).json({ msg: `Invalid collection name: ${collection}` });
    }
    try {
        const Model = mongoose.connection.collection(collection);
        const Model1 = mongoose.connection.collection(collections.USER_INFORMATION);
        const user = await Model.findOne({ user_id: user_id });
        const userInformation = await Model1.findOne({ user_id: user_id });
        if (!user) {
            return res.status(400).sebd({ msg: "User not found" });
        }
       
        let obj = {
            user_id:user.user_id,
            firstname:crypto.decrypt(user.firstname),
            lastname:crypto.decrypt(user.lastname),
            email:user.email,
            mobile:crypto.decrypt(user.mobile),
            age:user.age,
            dob:user.dob,
            profile_pic:user.profile_pic,
            additionalpictures:user.additionalpictures,
        }
        let obj1 = {
            about:userInformation.about,
            relationship_status:userInformation.relationship_status,
            height:userInformation.height,
            languages:userInformation.languages,
            professionals:userInformation.professionals,
            sexual_orientation:userInformation.sexual_orientation,
            show_age:userInformation.show_age,
            interests:userInformation.interests,
            basics:userInformation.basics
        }
        return res.status(200).send({
            success:true,
            data:obj,
            data1:obj1,
            message:"Get user profile"
        })

    } catch (error) {
        console.log("errorerror",error.stack)
        return res.status(500).json({
            success: false,
            message: "Intername server error",
            error: error.message
        });
    }
}

const updateUserInfo = async(req,res)=>{
    const { collection, user_id } = req.query;
    const data = req.body
    console.log("collection,user_id",collection,user_id,data)
    if (!collection) {
        return res.status(400).json({ msg: "Missing collection or data" });
    }

    if (!isValidCollection(collection)) {
        return res.status(400).json({ msg: `Invalid collection name: ${collection}` });
    }
    try {
        const Model = mongoose.connection.collection(collection);
        const response = await Model.updateOne({ user_id: user_id },{$set:data});
        console.log("response",response)
        return res.status(200).send({
            success:true,
            message:"Update Successfully"
        })
    } catch (error) {
        console.log("errorerror",error.stack)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export { insertData, signin, refreshToken, userProfile ,updateUserInfo}


