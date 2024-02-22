import { Users } from "../models/Users.js";
import { createToken } from "../utils/createToken.js";
import { doPasswordHash } from "../utils/hash.js";

export const loginService = async (email, password) => {
    const foundUser = await Users.findOne({ email: email });
    if (!foundUser) throw new Error("Invalid authorization");
    if (!foundUser.verified) throw new Error("Email verification required!");
    const passwordSalt = foundUser.passwordSalt;
    const loginPasswordHash = doPasswordHash(password, passwordSalt);
    if (foundUser.passwordHash !== loginPasswordHash)
        throw new Error("Invalid authorization");
    const accessToken = createToken(foundUser);
    const refreshToken = createToken(foundUser, "refresh");

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
