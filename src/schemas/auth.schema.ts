import { z } from "zod";
import { isValidCPF } from "../utils/cpf";

export const registerSchema = z.object({
  firstName: z.string().min(2, "Nome muito curto"),
  lastName: z.string().min(2, "Sobrenome muito curto"),
  email: z.string().email(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos")
    .refine((val) => isValidCPF(val), { message: "CPF inválido" }),
  rememberMe: z.boolean().optional().default(false),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional().default(false),
});

export const socialLoginSchema = z.object({
  provider: z.string().min(1),
  providerAccountId: z.string().min(1),
  email: z.string().email(),
  rememberMe: z.boolean().optional().default(false),
});
