import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./services/db_connection.js";

import authRoutes from "./routes/auth_routes.js";
import eventRoutes from "./routes/event_routes.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(json()); //parse raw json in req body..using instead of body parser
app.use(urlencoded({ extended: true })); //parse req data coming from URL

//connection to db - asynchronous method using then (NR)
connectDatabase();

//home route
// app.use("/", homeRoutes);

//auth routes
app.use("/auth", authRoutes);

//event Routes
app.use("/events", eventRoutes);

//favicon for browser
app.get("/favicon.ico", (_, res) => res.status(204));

//404 error handler page
app.use((_, res) => {
	res.status(500).send("404: Page Not Found");
});

//Server Listens On:
app.listen(port, () => {
	console.log(`Server Listening on ${port}`);
});
