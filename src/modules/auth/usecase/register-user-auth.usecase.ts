import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user.entity';
import { IUserRepository } from 'src/modules/user/interface/repository/user-repository.interface';
import { IBcryptLib } from 'src/shared/libs/bcrypt/interface/bcrypt-lib.interface';

@Injectable()
export class RegisterUserAuthUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IBcryptLib')
    private readonly bcryptLib: IBcryptLib,
  ) {}

  async execute(input: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }): Promise<User> {
    const [existingUserEmail, existingUserPhoneNumber] = await Promise.all([
      this.userRepository.findUser({ email: input.email }),
      this.userRepository.findUser({
        phoneNumber: input.phoneNumber,
      }),
    ]);
    if (existingUserEmail) {
      throw new ConflictException('Email already exists');
    }
    if (existingUserPhoneNumber) {
      throw new ConflictException('Phone number already exists');
    }
    if (input.password !== input.confirmPassword) {
      throw new ConflictException('Password and confirm password do not match');
    }
    const hashedPassword = await this.bcryptLib.hash({
      plainText: input.password,
      salt: 10,
    });
    const user = await this.userRepository.createUser({
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: hashedPassword,
    });
    return user;
  }
}
