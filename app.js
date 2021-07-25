import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./services/db_connection.js";
import connectCloudinary from "./services/cloudinary_connection.js";

import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import organizationRoutes from "./routes/organization_routes.js";
import eventRoutes from "./routes/event_routes.js";
import adminRoutes from "./routes/admin_routes.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(json()); //parse raw json in req body..using instead of body parser
app.use(urlencoded({ extended: true })); //parse req data coming from URL

//connection to db and cloudinary - asynchronous method using then (NR)
connectDatabase();
connectCloudinary();

//home route
// app.use("/", homeRoutes);

//auth routes
app.use("/auth", authRoutes);

//user routes
app.use("/user", userRoutes);

//organization Routes
app.use("/org", organizationRoutes);

//event Routes
app.use("/events", eventRoutes);

//admin Routes
app.use("/admin", adminRoutes);

//favicon for browser
app.get("/favicon.ico", (_, res) => res.status(204));

//404 error handler page
app.use((_, res) => {
	res.status(500).json({ message: "404: Page Not Found", state: false });
});

//Server Listens On:
app.listen(port, () => {
	console.log(`Server Listening on ${port}`);
});
