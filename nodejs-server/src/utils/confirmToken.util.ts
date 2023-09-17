import {
  ConfirmToken,
  ConfirmTokenInstance,
} from "../models/confirmToken.model";
import { Op } from "sequelize";

export const generateConfirmToken = () => {
  const min = 100000; // Minimum 6-digit number (100000)
  const max = 999999; // Maximum 6-digit number (999999)

  // Generate a random number between min and max (inclusive)
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  // Ensure the code is exactly 6 digits by left-padding with zeros if necessary
  const formattedCode = code.toString().padStart(6, "0");

  return formattedCode;
};

export const getConfirmToken = async (
  accountId: number,
  token: string
): Promise<ConfirmTokenInstance> => {
  try {
    const confirmToken: ConfirmTokenInstance | null =
      await ConfirmToken.findOne({
        where: {
          accountId: accountId,
          token: token,
          expiredTime: {
            [Op.gt]: new Date(), // Check if expiredTime is greater than the current date
          },
        },
      });

    if (!confirmToken) {
      throw new Error(`Token not found`);
    }

    return confirmToken;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
