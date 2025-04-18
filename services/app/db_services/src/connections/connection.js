import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const URL = `mongodb://${username}:${password}@ac-0ktkn7b-shard-00-00.xszhyhm.mongodb.net:27017,ac-0ktkn7b-shard-00-01.xszhyhm.mongodb.net:27017,ac-0ktkn7b-shard-00-02.xszhyhm.mongodb.net:27017/?ssl=true&replicaSet=atlas-diwl40-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
// const URL = `mongodb://${username}:${password}@ac-0ktkn7b-shard-00-00.xszhyhm.mongodb.net:27017,ac-0ktkn7b-shard-00-01.xszhyhm.mongodb.net:27017,ac-0ktkn7b-shard-00-02.xszhyhm.mongodb.net:27017/?ssl=true&replicaSet=atlas-diwl40-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
  // const URL = `mongodb://127.0.0.1:27017/dating-app`
const connectToDatabase = async () => {
    try {
      await mongoose.connect(URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
      });
      console.log(`Connection is successful`);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };
export default connectToDatabase;  