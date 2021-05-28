import mongoose from "mongoose";

//Mongoose Schema : Provides app level validation i.e when saving to the database
//TODO: Add actual model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 5,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

const User = mongoose.model("user", userSchema); //users (Plural) collection is created in db

//Export the model
export default User;
