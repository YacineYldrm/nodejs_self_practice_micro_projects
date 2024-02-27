import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { catchAsync } from "../utils/catchAsync.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const makeJWTAuth = (tokenType = "access") => {
    console.log(tokenType);
    return catchAsync(
        async (req, _, next) => {
            const token = extractToken(req, tokenType);
            const verifiedTokenPayload = jwt.verify(token, JWT_SECRET);
            if (verifiedTokenPayload.type !== tokenType)
                throw new Error("Invalid token type");

            req.verifiedUserClaims = verifiedTokenPayload;
            next();
        },
        { message: "Invalid authorization", status: 401 }
    );
};

const extractToken = (req, tokenType) => {
    if (tokenType === "refresh") return req.session.refreshToken;
    else {
        if (!req.headers.authorization)
            throw new Error("Authorization required!");
        const [authType, token] = req.headers.authorization.split(" ");
        if (authType !== "Bearer" || !token)
            throw new Error("Invalid authorization type");
        return token;
    }
};
