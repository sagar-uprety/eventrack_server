import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pqsbz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Database Connected Successfuly");
  } catch (err) {
    console.log(`Error occured when connecting to database ${err}`);
    process.exit(1); //exit with failure
  }
};

export default connectDB;
