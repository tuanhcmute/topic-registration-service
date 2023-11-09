import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface IPayLoad {
  email: string;
  exp: number;
  httpOnly: boolean;
  iat: number;
}

export const createJwtToken = (email: string) => {
  const secretKey = process.env.SECRET_KEY || "";
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, email: email }, // One day
    secretKey,
    { algorithm: "HS256" } // Specify the signing algorithm (e.g., RS256 for RSA)
  );
  return token;
};

export const verifyToken = (token: string): Promise<IPayLoad> => {
  const secretKey = process.env.SECRET_KEY || "";

  return new Promise<IPayLoad>((resolve, reject) => {
    jwt.verify(token, secretKey, { algorithms: ["HS256"] }, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded as IPayLoad);
    });
  });
};
