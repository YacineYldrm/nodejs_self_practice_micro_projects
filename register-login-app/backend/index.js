import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser("mySecretCookie"));

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 3001;
const URI = process.env.URI;

const runServer = app.listen(PORT, () =>
    console.log("Server is running at port: ", PORT)
);

const connectToDatabase = async () => {
    try {
        console.log("Starting server...");
        console.log("Connecting to database...");
        await mongoose.connect(URI, { dbName: "nodeJsSelfLearnDB" });
        console.log("Connection to database succeeded!");
    } catch (error) {
        throw new Error("Connection failed");
    }
};

connectToDatabase()
    .then(runServer)
    .catch((err) => console.log(err));
