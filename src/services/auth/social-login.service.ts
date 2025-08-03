import { signToken } from "../../lib/jwt";
import { AuthRepository } from "../../repositories/auth/auth.repository";

export class SocialLoginService {
  static async loginWithGoogle({
    provider,
    providerAccountId,
    email,
    rememberMe,
  }: {
    provider: string;
    providerAccountId: string;
    email: string;
    rememberMe: boolean;
  }) {
    let user = await AuthRepository.findByProvider(provider, providerAccountId);

    if (!user) {
      user = await AuthRepository.findByEmail(email);

      if (!user) {
        user = await AuthRepository.createUserWithProvider(
          email,
          provider,
          providerAccountId
        );
      } else {
        await AuthRepository.linkAccount(user.id, provider, providerAccountId);
      }
    }

    const token = signToken(user.id, rememberMe);
    return { status: 200, token };
  }
}
