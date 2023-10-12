import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/jwt.util";
export const authFilter =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized, please login sdfusdufudk" });
      }

      if (token.toLocaleLowerCase().startsWith("bearer ")) {
        token = token.slice("bearer".length).trim();
      }

      const decoded = await verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized, please login" });
      }

      const roleUser = decoded.role;
      if (roleUser !== role) {
        return res
          .status(401)
          .json({ message: "Not enough privileges to access" });
      }

      next();
    } catch (err) {
      throw err;
    }
  };
