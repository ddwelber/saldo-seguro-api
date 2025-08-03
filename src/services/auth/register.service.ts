import { hashPassword } from "../../utils/hash";
import { signToken } from "../../lib/jwt";
import { AuthRepository } from "../../repositories/auth/auth.repository";

type RegisterDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf: string;
  rememberMe: boolean;
};

export class RegisterService {
  static async register({
    email,
    password,
    firstName,
    lastName,
    cpf,
    rememberMe,
  }: RegisterDTO) {
    const exists = await AuthRepository.findByEmailOrCpf(email, cpf);
    if (exists) {
      return { status: 409, body: { message: "Email ou CPF já cadastrados" } };
    }

    const hashed = await hashPassword(password);
    const user = await AuthRepository.createUser({
      email,
      password: hashed,
      firstName,
      lastName,
      cpf,
    });

    const token = signToken(user.id, rememberMe);
    return { status: 201, token };
  }
}
