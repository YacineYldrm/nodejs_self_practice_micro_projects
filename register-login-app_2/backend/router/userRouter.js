import express from "express";
import { registerCtrl } from "../controller/registerCtrl.js";
import { loginCtrl } from "../controller/loginCtrl.js";
import { refreshTokenCtrl } from "../controller/refreshTokenCtrl.js";
import { verificationCtrl } from "../controller/verificationCtrl.js";
import { makeJWTAuth } from "../middlewares/makeJWTAuth.js";

export const userRouter = express
    .Router()
    .post(
        "/refreshToken",
        makeJWTAuth("refresh"),
        express.json(),
        refreshTokenCtrl
    )
    .post("/register", express.json(), registerCtrl)
    .post("/login", express.json(), loginCtrl)
    .post("/verification", express.json(), verificationCtrl);
