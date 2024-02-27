import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "../models/Users.js";
import { createToken } from "../utils/createToken.js";
dotenv.config();

export const refreshTokenService = async (userId) => {
    const user = await Users.findById(userId);
    const newAccessToken = createToken(user);
    return newAccessToken;
};
