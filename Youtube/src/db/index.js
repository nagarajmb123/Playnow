import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const uri = `mongodb+srv://abhinavnb11:benaka234@cluster0.vbw5nr9.mongodb.net`
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(uri)
        console.log(`\n MongoDB connected!! DB  host: ${connectionInstance.connection.host}`)
    } catch (err) {
        console.log("MONGODB connection error", err);
        process.exit(1)
    }
}

export default connectDB