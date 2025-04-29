import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user.entity';
import { IUserRepository } from 'src/modules/user/interface/repository/user-repository.interface';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<User> {
    const user = await this.userRepository.findUserRepository({
      id: input.id,
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
