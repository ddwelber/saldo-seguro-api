export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calcCheckDigit = (base: string, factor: number) => {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i]) * (factor - i);
    }
    const remainder = total % 11;
    return remainder < 2 ? "0" : String(11 - remainder);
  };

  const base = cpf.slice(0, 9);
  const digit1 = calcCheckDigit(base, 10);
  const digit2 = calcCheckDigit(base + digit1, 11);

  return cpf.endsWith(digit1 + digit2);
}
