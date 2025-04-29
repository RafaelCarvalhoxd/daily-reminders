import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user.entity';
import { IUserRepository } from 'src/modules/user/interface/repository/user-repository.interface';
import { UserModel } from 'src/modules/user/repository/models/user.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly ds: DataSource) {}

  async findUserRepository(input: {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<User | null> {
    const user = await this.ds.getRepository(UserModel).findOne({
      where: {
        ...(input.id ? { id: input.id } : {}),
        ...(input.name ? { name: input.name } : {}),
        ...(input.email ? { email: input.email } : {}),
        ...(input.phoneNumber ? { phoneNumber: input.phoneNumber } : {}),
      },
    });
    return user ? user.toEntity() : null;
  }
}
