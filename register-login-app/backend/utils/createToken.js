import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = (user, tokenType = "access") => {
    const expiresIn =
        {
            access: "1h",
            refresh: "10d",
        }[tokenType] || "10min";

    return jwt.sign({ sub: user._id, type: tokenType }, JWT_SECRET, {
        expiresIn,
    });
};
