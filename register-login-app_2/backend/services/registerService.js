import { Users } from "../models/Users.js";
import { generateSaltHash, doPasswordHash } from "../utils/hash.js";
import { sendMail } from "../utils/verificationMail.js";

export const registerService = async (userBody) => {
    const user = await Users.findOne({ email: userBody.email });
    if (user) throw new Error("User with this email already exists!");

    const saltHash = generateSaltHash();
    const passwordHash = doPasswordHash(userBody.password, saltHash);
    const randomSixDigitCode = Math.random().toString().slice(2, 8);
    console.log(randomSixDigitCode);
    const newUser = await Users.create({
        ...userBody,
        passwordHash: passwordHash,
        passwordSalt: saltHash,
        sixDigitCode: randomSixDigitCode,
    });
    sendMail(
        newUser.email,
        newUser.sixDigitCode,
        newUser.id,
        newUser.firstName,
        newUser.lastName
    );
    console.log(newUser);
    return newUser;
};
