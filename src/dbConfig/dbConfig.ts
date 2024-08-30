import mongoose from "mongoose";

export async function connect() {
    try {
        // mongoose.connect(process.env.MONGO_URI) in this here comes error whether the MONGO_URI is fethched or not 
        // we use ! sign at last because it is guranteed that we will get URI otherwise we could use  if else
        mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection // hold this variable because  sometimes connection is done but after that some issues arrive 
        connection.on('connected' , ()=>{
            console.log("MongoDB is connected");
        })
        connection.on('error' , (err)=>{
            console.log("MongoDB is not  connected: " + err);
            process.exit();
        })


    } catch (error) {
        console.log("DB connection error");
        console.log(error);
    }
}