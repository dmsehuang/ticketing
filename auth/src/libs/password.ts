import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// scrypt is callback based, that's why we need promisfy
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppiedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppiedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
