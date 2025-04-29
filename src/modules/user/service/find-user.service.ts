import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user.entity';
import { IFindUserService } from 'src/modules/user/interface/service/find-user-service.interface';
import { FindUserUseCase } from 'src/modules/user/usecase/find-user.usecase';

@Injectable()
export class FindUserService implements IFindUserService {
  constructor(private readonly findUserUseCase: FindUserUseCase) {}

  async execute(input: {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<User> {
    return await this.findUserUseCase.execute(input);
  }
}
