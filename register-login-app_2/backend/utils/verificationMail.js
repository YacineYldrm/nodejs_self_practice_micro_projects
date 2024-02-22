import dotenv from "dotenv";
import { google } from "googleapis";
import nodemailer from "nodemailer";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const USER_EMAIL = process.env.USER_EMAIL;
const VERIFICATION_LINK = process.env.VERIFICATION_LINK;

// headers configuration
const OAuthTwoClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

OAuthTwoClient.setCredentials({ refresh_token: REFRESH_TOKEN });

console.log(OAuthTwoClient);

export const sendMail = async (
    receiver_email,
    sixDigitCode,
    userId,
    firstName,
    lastName
) => {
    try {
        // get access token
        const ACCESS_TOKEN = await OAuthTwoClient.getAccessToken();
        // login to email service
        const emailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                accessToken: ACCESS_TOKEN,
                refreshToken: REFRESH_TOKEN,
            },
        });
        // create email
        const emailOptions = {
            from: `Registration service <${USER_EMAIL}>`,
            to: receiver_email,
            subject: "Verify yor email",
            html: `<p>Dear ${firstName} ${lastName}, 
                    Thank you for registering. To complete the registration process and gain full access to our services, we kindly ask you to verify your email address. Please click on the following link and enter your six-digit code on our website to verify your email address:</p> <h3>Your code: ${sixDigitCode}</h3> <a href=${VERIFICATION_LINK}/${userId}>Verification</a>
                    
                    <p>Best regards</p>`,
        };

        // send email
        const sentMail = await emailTransporter.sendMail(emailOptions);
        console.log(sentMail);
    } catch (error) {
        console.log(error);
    }
};
