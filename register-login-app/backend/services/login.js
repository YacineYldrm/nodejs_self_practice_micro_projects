import { findUserByEmail } from "../data-access/DAO.js";
import { createToken } from "../utils/createToken.js";
import { passwordHash } from "../utils/hash.js";

export const loginService = async (email, password) => {
    const foundUser = await findUserByEmail(email);

    const password_Hash = passwordHash(password, foundUser.passwordSalt);
    if (password_Hash !== foundUser.passwordHash)
        throw new Error("Invalid password or email");
    const accessToken = createToken(foundUser);
    const refreshToken = createToken(foundUser, "refresh");
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
