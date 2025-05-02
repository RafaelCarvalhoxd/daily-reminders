import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReminderRequestDto } from 'src/modules/reminder/dto/request/create-reminder-request.dto';
import { ReminderResponseDto } from 'src/modules/reminder/dto/response/reminder-response.dto';
import { ICreateReminderService } from 'src/modules/reminder/interfaces/service/create-reminder.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { User } from 'src/shared/types/user.type';

@ApiBearerAuth('access-token')
@ApiTags('Reminder')
@Controller('reminder')
export class ReminderController {
  constructor(
    @Inject('ICreateReminderService')
    private readonly createService: ICreateReminderService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createReminder(
    @Body() dto: CreateReminderRequestDto,
    @CurrentUser() user: User,
  ): Promise<ReminderResponseDto> {
    const reminder = await this.createService.execute(
      {
        title: dto.title,
        description: dto.description,
        isActive: dto.isActive,
        status: dto.status,
        dueDates: dto.dueDates,
      },
      user.id,
    );

    return ReminderResponseDto.toJson(reminder);
  }
}
