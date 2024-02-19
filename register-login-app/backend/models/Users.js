import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        passwordSalt: { type: String, required: true },
        verified: { type: Boolean, required: true },
    },
    { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
