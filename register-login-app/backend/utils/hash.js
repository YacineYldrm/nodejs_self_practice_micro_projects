import crypto from "crypto";

const hash = (string) => {
    return crypto.createHash("sha512").update(string).digest("hex");
};

export const passwordSalt = () => {
    const salt = crypto.randomBytes(64).toString("base64");
    return hash(salt);
};

export const passwordHash = (password, saltHash) => {
    const hashedPW = hash(password);
    return hash(hashedPW + saltHash);
};
