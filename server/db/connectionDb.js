
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const instance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${instance.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};
export default connectDB;