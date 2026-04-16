import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { getPositiveIntegerEnv } from '../env';

@Injectable()
export class PasswordService {
  private readonly saltRounds = getPositiveIntegerEnv('BCRYPT_SALT_ROUNDS');

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
