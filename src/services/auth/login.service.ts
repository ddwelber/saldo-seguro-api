import { signToken } from "../../lib/jwt";
import { AuthRepository } from "../../repositories/auth/auth.repository";
import { comparePassword } from "../../utils/hash";

export class LoginService {
  static async login(email: string, password: string, rememberMe: boolean) {
    const user = await AuthRepository.findByEmail(email);
    if (!user || !user.password) {
      return { status: 401, body: { message: "E-mail ou senha inválidos" } };
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return { status: 401, body: { message: "E-mail ou senha inválidos" } };
    }

    const token = signToken(user.id, rememberMe);
    return { status: 200, token };
  }
}
