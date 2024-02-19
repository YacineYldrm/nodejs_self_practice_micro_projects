import { createNewUser } from "../data-access/DAO.js";
import { passwordHash, passwordSalt } from "../utils/hash.js";

export const registerService = async (user) => {
    const password_Salt = passwordSalt();
    const password_Hash = passwordHash(user.password, password_Salt);
    delete user.password;
    const newUser = await createNewUser(user, password_Hash, password_Salt);
    return newUser;
};
