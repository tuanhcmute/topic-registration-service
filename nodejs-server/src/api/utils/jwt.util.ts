import jwt, { SignOptions, VerifyCallback, VerifyOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();

interface IPayLoad {
  id: string;
  role: string;
  exp: number;
  httpOnly: boolean;
  iat: number;
}

export const createJwtToken = (id: string, role: string) => {
  const privateKey = fs.readFileSync("private-key.pem", "utf8"); // Read the private key from a file

  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, id: id, role: role },
    privateKey,
    { algorithm: "RS256" } // Specify the signing algorithm (e.g., RS256 for RSA)
  );
  return token;
};

export const verifyToken = (token: string): Promise<IPayLoad> => {
  const publicKey = fs.readFileSync("public-key.pem", "utf8"); // Read the public key from a file

  return new Promise<IPayLoad>((resolve, reject) => {
    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      return resolve(decoded as IPayLoad);
    });
  });
};
