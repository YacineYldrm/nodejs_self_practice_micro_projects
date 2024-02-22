import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "../models/Users.js";
import { createToken } from "../utils/createToken.js";
dotenv.config();

export const refreshTokenService = async (refreshToken) => {
    const { sub, type } = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (type !== "refresh") throw new Error("Invalid token type");
    const user = await Users.findById(sub);
    const newAccessToken = createToken(user);
    return newAccessToken;
};
