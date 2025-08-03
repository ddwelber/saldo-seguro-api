import { Response } from "express";
import { env } from "../config/env";

export function setAuthCookie(
  res: Response,
  token: string,
  rememberMe: boolean
) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: rememberMe ? 1000 * 60 * 60 * 24 * 365 : 1000 * 60 * 60 * 24, // 1y ou 1d
    path: "/",
  });
}
