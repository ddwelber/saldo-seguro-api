import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function signToken(userId: string, rememberMe: boolean = false) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: rememberMe ? "1y" : "1d" } 
  );
}
