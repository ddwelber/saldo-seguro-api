import { Request, Response } from "express";
import { SocialLoginService } from "../../services/auth/social-login.service";
import { socialLoginSchema } from "../../schemas/auth.schema";
import { setAuthCookie } from "../../lib/cookies";

export async function loginWithGoogle(req: Request, res: Response) {
  const parsed = socialLoginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Dados inválidos", errors: parsed.error.format() });
  }

  const { provider, providerAccountId, email, rememberMe } = parsed.data;

  const result = await SocialLoginService.loginWithGoogle({
    provider,
    providerAccountId,
    email,
    rememberMe,
  });

  if (result.status !== 200) {
    return res.status(result.status).json({ message: "Erro no login social" });
  }

  setAuthCookie(res, result.token, rememberMe);
  return res.sendStatus(200);
}
