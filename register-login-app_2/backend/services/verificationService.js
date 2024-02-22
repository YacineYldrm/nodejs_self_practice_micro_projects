import { Users } from "../models/Users.js";

export const verificationService = async (userId, sixDigitCode) => {
    const foundUser = Users.findById(userId);
    if (!foundUser) throw new Error("User doesn't exist.");
    const userSixDigitCode = foundUser.sixDigitCode;
    if (userSixDigitCode !== sixDigitCode)
        if (!foundUser) throw new Error("Invalid code.");

    await Users.findByIdAndUpdate(userId, { verified: true });
    return;
};
