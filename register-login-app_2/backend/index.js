import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { userRouter } from "./router/userRouter.js";
import cookieSession from "cookie-session";

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({ origin: process.env.HOST_DOMAIN, credentials: true }));
app.use(morgan("dev"));
app.use(
    cookieSession({
        name: "session",
        httpOnly: true,
        secure: false,
        signed: true,
        secret: process.env.COOKIE_SECRET,
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.use("/api/v1/users", userRouter);

const runServer = app.listen(PORT, () =>
    console.log("Server is running at port: ", PORT)
);

const connectToDatabase = async () => {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(process.env.URI, {
            dbName: "nodeJsSelfLearnDB",
        });
        console.log("Connection to database succeeded");
    } catch (error) {
        console.log("Connection failed", error);
    }
};

connectToDatabase().then(runServer);
