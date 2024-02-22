import dotenv from "dotenv";
import { google } from "googleapis";
import nodemailer from "nodemailer";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const USER_MAIL = process.env.USER_MAIL;
const RECIEVER_MAIL = process.env.RECIEVER_MAIL;

const OAuthClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

OAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async () => {
    try {
        const ACCESS_TOKEN = await OAuthClient.getAccessToken();
        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: USER_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN,
            },
        });
        const mailOptions = {
            from: `Future Yasin <${USER_MAIL}>`,
            to: RECIEVER_MAIL,
            subject: "Tipp",
            text: "Bleib geschmeidig",
            html: "<p>Bleib geschmeidig</p> ",
        };
        const sentMail = await mailTransporter.sendMail(mailOptions);
        console.log(sentMail);
    } catch (error) {
        console.log(error);
    }
};

sendMail();
