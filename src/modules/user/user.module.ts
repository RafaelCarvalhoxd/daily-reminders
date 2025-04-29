import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/modules/user/controller/user.controller';
import { UserModel } from 'src/modules/user/repository/models/user.model';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { FindUserService } from 'src/modules/user/service/find-user.service';
import { FindUserUseCase } from 'src/modules/user/usecase/find-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    FindUserUseCase,
    {
      provide: 'IFindUserService',
      useClass: FindUserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
