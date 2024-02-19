import { createToken } from "./createToken.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/Users.js";
dotenv.config();

export const refreshToken = async (refreshToken) => {
    const verifiedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (verifiedToken.type !== "refresh")
        throw new Error("Expected type refresh");
    const user = await User.findById(verifiedToken.sub);
    const newAccessToken = createToken(user);
    return newAccessToken;
};
