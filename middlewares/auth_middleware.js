import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authTokenCheck = (req, res, next) => {
  const authToken = req.header("auth-token");
  if (!authToken) return res.status(401).json({ message: "Access Denied" });

  try {
    const verifyToken = jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET);
    // req.user = verifyToken; //returns jwt payload.
    next();
  } catch (err) {
    console.log(`Error ${err}`);
    res.status(400).json({ message: "Invalid Token" });
  }
};

const checkUser = async (req, res, next) => {
  const authToken = req.header("auth-token");
  if (!authToken) return res.status(401).json({ message: "No Acess Token" });

  try {
    const verifyToken = jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET);
    let user = await User.findById(verifyToken._id);
    req.user = user; //returns acutal User Model - Mongo
    next();
  } catch (err) {
    req.user = null;
    console.log(`Error ${err}`);
    res.status(400).json({ message: "Invalid Token" });
    next();
  }
};
export { authTokenCheck, checkUser };
