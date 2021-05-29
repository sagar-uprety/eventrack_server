import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//User SignUp
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: req.body.email,
    });
    //If the user is already registered
    if (user !== null) {
      res.json("User Already exist");
      return;
      //If the user is not registered. Create a new user
    } else {
      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(password, saltRounds);

      const user = new User({
        email: email,
        password: hashedPass,
      });
      const newUser = await user.save(); //save user to MongoDB

      //Create an auth-token (JWT) and send as an header so next time user does not have to login again.
      const authToken = createToken(user._id);
      res.header("auth-token", authToken).json({
        message: "User Registered",
        "auth-token": authToken,
        "user-details": user,
      });

      console.log("New user registered");
    }
  } catch (err) {
    console.log(`User creation failed : ${err}`);
    res.json({ message: err });
  }
};

//User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: req.body.email,
    });

    if (user == null) {
      return res.json("User Not Found");
    }
    //if user in registered
    else {
      //check password
      const passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password
      );
      //if the password is correct. Then create a token and send to user
      if (passwordCheck) {
        const authToken = createToken(user._id);
        res
          .header("auth-token", authToken)
          .json({ message: "User Logged In", "auth-token": authToken });
      }
      //if it's incorrect password
      else {
        res.json("Incorrect Password");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Do this from Flutter
const logoutUser = (req, res) => {
  res
    .header("auth-token", "")
    .json({ message: "User Logged In", "auth-token": authToken });
};

//Create JWT Token as an auth-token. So users do not have to login again and again.
//token expires in 30 days. //! Try to implement Refresh Tokens as well
const maxAge = 30 * 24 * 60 * 60; //in seconds
const createToken = (id) => {
  const authToken = jwt.sign({ _id: id }, process.env.AUTH_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
  return authToken;
};

export default {
  createUser,
  loginUser,
  logoutUser,
};