import mongoose from "mongoose";
const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connected = mongoose.connect(process.env.MONGO_URI, {
            dbName: "HRMS",
        });
        console.log(`HRMS DB connected successfully ............ ${(await connected).connection.host}`)
    } catch (error) {
        console.log("DB Connection failed", error.message);
        process.exit(1);
    }
};

export default dbConnect;