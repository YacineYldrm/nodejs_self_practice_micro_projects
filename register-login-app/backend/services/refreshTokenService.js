import { refreshToken } from "../utils/refreshToken.js";
import jwt from "jsonwebtoken";
export const refreshTokenService = async (refreshTokenBase64) => {
    try {
        const verifiedToken = jwt.verify(
            refreshTokenBase64,
            process.env.JWT_SECRET
        );
        if (!verifiedToken) throw new Error("Invalid authentication!");
        const newAccessToken = await refreshToken(refreshTokenBase64);
        return newAccessToken;
    } catch (error) {
        return error;
    }
};
