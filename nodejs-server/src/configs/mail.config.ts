import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodeMailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 465,
  auth: {
    user: process.env.SERVER_MAIL_USER,
    pass: process.env.SERVER_MAIL_PASSWORD,
  },
  secure: false, // Set to false to disable SSL/TLS
});
