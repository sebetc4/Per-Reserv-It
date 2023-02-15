import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { resetPasswordEmail } from '../../../packages/templates';

const clientId = process.env.EMAIL_API_CLIENT_ID!;
const clientSecret = process.env.EMAIL_API_CLIENT_SECRET!;
const redirectUri = process.env.EMAIL_API_REDIRECT_URI!;
const refreshToken = process.env.EMAIL_API_REFRESH_TOKEN!;
const senderEmail = process.env.EMAIL_API_SENDER_EMAIL!;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

const accessToken = (await oAuth2Client.getAccessToken()) as string;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: senderEmail,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
    },
});

type EmailOptions = {
    email: string;
    username: string;
    resetUrl: string;
};
export const sendResetPasswordEmail = async ({ email: to, username, resetUrl }: EmailOptions) =>
    await transporter.sendMail({
        from: `Reserv\'It <${senderEmail}>`,
        to,
        subject: "Reserv'It - Réinitialisation du mot de passe",
        html: resetPasswordEmail({ username, resetUrl }),
    });
