import { prisma } from "../../lib/prisma";

export class AuthRepository {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });
  }

  static async findByProvider(provider: string, providerAccountId: string) {
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      include: { user: true },
    });

    return account?.user || null;
  }

  static async createUserWithProvider(
    email: string,
    provider: string,
    providerAccountId: string
  ) {
    return prisma.user.create({
      data: {
        email,
        accounts: {
          create: {
            provider,
            providerAccountId,
          },
        },
      },
    });
  }

  static async linkAccount(
    userId: string,
    provider: string,
    providerAccountId: string
  ) {
    return prisma.account.create({
      data: {
        userId,
        provider,
        providerAccountId,
      },
    });
  }

  static async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    cpf: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  static async findByEmailOrCpf(email: string, cpf: string) {
    return prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });
  }
}
