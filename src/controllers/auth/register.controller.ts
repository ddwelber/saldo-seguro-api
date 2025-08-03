import { Request, Response } from "express";
import { RegisterService } from "../../services/auth/register.service";
import { registerSchema } from "../../schemas/auth.schema";
import { setAuthCookie } from "../../lib/cookies";

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Dados inválidos", errors: parsed.error.format() });
  }

  const { email, password, firstName, lastName, cpf, rememberMe } = parsed.data;

  const result = await RegisterService.register({
    email,
    password,
    firstName,
    lastName,
    cpf,
    rememberMe,
  });

  if (result.status !== 201 || !result.token) {
    return res.status(result.status).json(result.body);
  }

  setAuthCookie(res, result.token, rememberMe);
  return res.sendStatus(201);
}
