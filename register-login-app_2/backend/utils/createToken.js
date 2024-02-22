import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createToken = (user, tokenType = "access") => {
    const expiresIn =
        {
            access: "1h",
            refresh: "1d",
        }[tokenType] || "10min";

    return jwt.sign(
        { sub: user._id, type: tokenType },
        process.env.JWT_SECRET,
        { expiresIn }
    );
};
