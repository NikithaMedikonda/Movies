
import mongoose from "mongoose"

export const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost/newDb") 
        console.log('Server connected to MongoDb');
    } catch (err) {
        console.error(err);
    }
}
