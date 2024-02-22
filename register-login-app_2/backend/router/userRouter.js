import express from "express";
import { registerCtrl } from "../controller/registerCtrl.js";
import { loginCtrl } from "../controller/loginCtrl.js";
import { refreshTokenCtrl } from "../controller/refreshTokenCtrl.js";
import { verificationCtrl } from "../controller/verificationCtrl.js";

export const userRouter = express
    .Router()
    .post("/register", express.json(), registerCtrl)
    .post("/login", express.json(), loginCtrl)
    .post("/refreshToken", express.json(), refreshTokenCtrl)
    .post("/verification", express.json(), verificationCtrl);
