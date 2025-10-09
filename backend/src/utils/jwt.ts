import { sign, verify, SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'dev-secret';

export function signToken(payload: object, expiresIn: SignOptions['expiresIn'] = '7d'): string {
  const options: SignOptions = { expiresIn } as SignOptions;
  return sign(payload as any, JWT_SECRET, options);
}

export function verifyToken<T = any>(token: string): T {
  return verify(token, JWT_SECRET) as T;
}
