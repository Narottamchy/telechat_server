import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const Connection = async() =>{
    const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-ov7vw78-shard-00-00.k4aqrbu.mongodb.net:27017,ac-ov7vw78-shard-00-01.k4aqrbu.mongodb.net:27017,ac-ov7vw78-shard-00-02.k4aqrbu.mongodb.net:27017/?ssl=true&replicaSet=atlas-z8mezq-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useUnifiedTopology: true});
       console.log("database connect hogya");
    }catch(error){
        console.log("error hai ",error.message)
    }
}

export default Connection;