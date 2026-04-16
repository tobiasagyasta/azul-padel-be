const requiredEnvError = (name: string) =>
  new Error(`Missing required environment variable: ${name}`);

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw requiredEnvError(name);
  }

  return value;
}

export function getPositiveIntegerEnv(name: string): number {
  const rawValue = requireEnv(name);
  const value = Number.parseInt(rawValue, 10);

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `Environment variable ${name} must be a positive integer.`,
    );
  }

  return value;
}

export function getPort(): number {
  const rawValue = process.env.PORT;

  if (rawValue === undefined || rawValue.trim() === '') {
    return 3000;
  }

  const value = Number.parseInt(rawValue, 10);

  if (!Number.isInteger(value) || value < 1 || value > 65535) {
    throw new Error(
      'Environment variable PORT must be an integer between 1 and 65535.',
    );
  }

  return value;
}

export function validateRuntimeEnv(): void {
  requireEnv('DATABASE_URL');
  requireEnv('JWT_SECRET');
  getPositiveIntegerEnv('BCRYPT_SALT_ROUNDS');
  getPort();
}
