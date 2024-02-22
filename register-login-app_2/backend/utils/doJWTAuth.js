import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const doJWTAuth = async (req, res, next) => {
    try {
        const [authType, accessToken] = await req.headers.authorization.split(
            " "
        );
        if (authType !== "Bearer") throw new Error("Invalid authentication");
        const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!verifiedToken) throw new Error("Invalid authentication");
        next();
    } catch (error) {
        res.status(402).json({ success: false, error: error });
    }
};
