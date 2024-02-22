import crypto from "crypto";
const hash = (string) => {
    return crypto.createHash("sha512").update(string).digest("hex");
};

export const generateSaltHash = () => {
    const generatedSalt = crypto.randomBytes(64).toString("base64");
    return hash(generatedSalt);
};

export const doPasswordHash = (password, saltHash) => {
    const hashedPassword = hash(password);
    return hash(`${hashedPassword}${saltHash}`);
};
