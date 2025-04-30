import { Global, Module } from '@nestjs/common';
import { BcryptLib } from 'src/shared/libs/bcrypt/bcrypt.lib';

const providers = [
  {
    provide: 'IBcryptLib',
    useClass: BcryptLib,
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class BcryptModule {}
