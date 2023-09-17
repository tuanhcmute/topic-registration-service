import { transporter } from "../configs/mail.config";
import { generateConfirmToken } from "./confirmToken.util";
const createConfirmToken = (): string => {
  return "sdhffd";
};

export const sendTokenEmail = async (receiver: string, token: string) => {
  try {
    const options = {
      from: '"Bui Admin" <admin@inbox.mailtrap.io>',
      to: receiver,
      subject: "Conirm your registration",
      text: "Use this token to confirm your new account", // plain text body
      html: `<b>${token}</b>`,
    };

    await transporter.sendMail(options);
  } catch (err) {
    console.log(err);
    throw new Error("Error during sendin mail");
  }
};
