import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const doJWTAuth = async (req, res, next) => {
    try {
        const [authType, token] = req.headers.authorization.split(" ");
        const verifiedToken = jwt.verify(token, JWT_SECRET);
        if (authType !== "Bearer" || !verifiedToken)
            throw new Error("Invalid authentication");
        next();
    } catch (error) {
        res.json({ success: false, error: error });
    }
};
