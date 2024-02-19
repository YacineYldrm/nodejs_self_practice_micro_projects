import mongoose from "mongoose";
import { User } from "../models/Users.js";

export const createNewUser = async (user, passwordHash, passwordSalt) => {
    return await User.create({
        ...user,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
        verified: false,
    });
};

export const findUserByEmail = async (email) => {
    const foundUser = await User.findOne({ email: email });
    return foundUser;
};
