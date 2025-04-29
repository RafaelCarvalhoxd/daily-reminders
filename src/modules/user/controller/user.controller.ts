import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/modules/user/dto/response/user-response.dto';
import { IFindUserService } from 'src/modules/user/interface/service/find-user-service.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IFindUserService')
    private readonly findService: IFindUserService,
  ) {}

  @Get(':id')
  async findUser(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.findService.execute({
      id: id,
    });
    return UserResponseDto.toJson(user);
  }
}
