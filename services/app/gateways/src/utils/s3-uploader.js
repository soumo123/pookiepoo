import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from './s3.config.js';

export const uploadToS3 = async (buffer, key) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: 'image/jpeg',
        // ACL: 'public-read'
    };

    await s3Client.send(new PutObjectCommand(params));
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};