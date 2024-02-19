import express from "express";
import { registerCtrl } from "../controller/registerCtrl.js";
import { loginCtrl } from "../controller/loginCtrl.js";
import { doJWTAuth } from "../utils/doJWTAuth.js";
import { refreshTokenCtrl } from "../controller/refreshTokenCtrl.js";

const userRouter = express.Router();

userRouter.post("/refresh", express.json(), refreshTokenCtrl);

userRouter.post("/login", express.json(), loginCtrl);

userRouter.post("/register", express.json(), registerCtrl);

export default userRouter;
