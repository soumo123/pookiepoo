import call_api from "../utils/helper.js";
import { uploadToS3 } from '../utils/s3-uploader.js'; // New S3 helper
import sharp from 'sharp';

const createUser = async (req, res) => {
    try {
        const { body, files } = req;

        // Process and upload images
        const uploadPromises = [];
        const imageData = {};

        // Process profile picture
        if (files?.profile_pic?.[0]) {
            const processedFile = await sharp(files.profile_pic[0].buffer)
                .resize(800, 800)
                .jpeg({ quality: 80 })
                .toBuffer();

            const key = `users/${body.firstname}/profile/${Date.now()}.jpeg`;
            uploadPromises.push(
                uploadToS3(processedFile, key)
                    .then(url => {
                        imageData.profile_pic = { url, key };
                    })
            );
        }

        // Process additional pictures
        if (files?.additionalpictures) {
            imageData.additionalpictures = [];
            files.additionalpictures.forEach(async (file, index) => {
                const processedFile = await sharp(file.buffer)
                    .resize(800, 800)
                    .jpeg({ quality: 80 })
                    .toBuffer();

                const key = `users/${body.firstname}/gallery/${Date.now()}-${index}.jpeg`;
                uploadPromises.push(
                    uploadToS3(processedFile, key)
                        .then(url => {
                            imageData.additionalpictures.push({ url, key });
                        })
                );
            });
        }

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        // Prepare final data
        const userData = {
            ...body,
            ...imageData,
            user_id: body.user_id
        };
        // Send to DB service
        const result = await call_api(
            '/createuser?collection=users', 
            {},
            'post',
            userData
        );

        return res.status(201).json({
            success: true,
            message: "User added successfully",
            data: result.data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export {createUser}