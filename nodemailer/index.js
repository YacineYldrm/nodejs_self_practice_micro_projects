import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuthToClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuthToClient.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async () => {
    try {
        const accessToken = await oAuthToClient.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: `John Doe <${process.env.USER_EMAIL}>`,
            to: process.env.RECIEVER_MAIL,
            subject: "Hello from gmail using API",
            text: "Hello from gmail email using API",
            html: "<p>Hello from gmail email using API</p>",
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};

sendMail()
    .then((result) => console.log("Email sent...", result))
    .catch((error) => console.log(error));
