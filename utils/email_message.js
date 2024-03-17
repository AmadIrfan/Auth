// @ts-nocheck

const nodemailer = require('nodemailer');
require('dotenv').config();
async function sendEmail(email, subject, htmlText) {
    try {
        const transport = nodemailer.createTransport({
            port: process.env.NODE_PORT,
            service: process.env.SERVICE,
            host: process.env.HOST,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transport.sendMail({
            from: `AMADIRFAN <${process.env.EMAIL}>`,
            to: email,
            subject: subject,
            html: `	${htmlText}`,
        });
        return "email sent successfully";
    } catch (e) {
        throw Error(e);
    }
}
module.exports = {
    sendEmail
}