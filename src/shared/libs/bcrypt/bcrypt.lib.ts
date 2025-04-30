import { IBcryptLib } from 'src/shared/libs/bcrypt/interface/bcrypt-lib.interface';
import * as bcrypt from 'bcrypt';

export class BcryptLib implements IBcryptLib {
  async compare(input: {
    plainText: string;
    hashedText: string;
  }): Promise<boolean> {
    return bcrypt.compare(input.plainText, input.hashedText);
  }

  async hash(input: { plainText: string; salt: number }): Promise<string> {
    return bcrypt.hash(input.plainText, input.salt);
  }
}
