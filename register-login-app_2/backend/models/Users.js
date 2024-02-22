import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        passwordSalt: { type: String, required: true },
        verified: { type: Boolean, default: false, required: true },
        sixDigitCode: { type: String, required: true },
    },
    { collection: "users", timestamps: true }
);

export const Users = mongoose.model("Users", userSchema);
