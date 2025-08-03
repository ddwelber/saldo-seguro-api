import { Request, Response } from "express";
import { LoginService } from "../../services/auth/login.service";
import { loginSchema } from "../../schemas/auth.schema";
import { setAuthCookie } from "../../lib/cookies";

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "E-mail ou senha incorretos",
      errors: parsed.error.format(),
    });
  }

  const { email, password, rememberMe } = parsed.data;
  const result = await LoginService.login(email, password, rememberMe);

  if (result.status !== 200 || !result.token) {
    return res.status(result.status).json(result.body);
  }

  setAuthCookie(res, result.token, rememberMe);
  return res.sendStatus(200);
}
