import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD


const URL = `mongodb://${username}:${password}@ac-0ktkn7b-shard-00-00.xszhyhm.mongodb.net:27017,ac-0ktkn7b-shard-00-01.xszhyhm.mongodb.net:27017,ac-0ktkn7b-shard-00-02.xszhyhm.mongodb.net:27017/?ssl=true&replicaSet=atlas-diwl40-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
const connectToDatabase = async () => {
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds timeout
        socketTimeoutMS: 45000, // 45 seconds socket timeout
        bufferCommands: false, // Disable Mongoose buffering
  
      });
      console.log(`Connection is successful`);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };
export default connectToDatabase;  