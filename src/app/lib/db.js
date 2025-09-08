import mongoose from "mongoose";

export const connectionStr = process.env.MONGO_DB_URL;

const connectDatabase = async () => {
  try {
    const dbconnection = await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
    });
    if (dbconnection) {
      console.log("Connected DB");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDatabase;
