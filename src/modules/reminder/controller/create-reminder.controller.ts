import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReminderRequestDto } from 'src/modules/reminder/dto/request/create-reminder-request.dto';
import { ReminderResponseDto } from 'src/modules/reminder/dto/response/reminder-response.dto';
import { ICreateReminderService } from 'src/modules/reminder/interfaces/service/create-reminder.service';

@ApiTags('Reminder')
@Controller('reminder')
export class CreateReminderController {
  constructor(
    @Inject('ICreateReminderService')
    private readonly service: ICreateReminderService,
  ) {}

  @Post()
  async createReminder(
    @Body() dto: CreateReminderRequestDto,
  ): Promise<ReminderResponseDto> {
    const reminder = await this.service.execute({
      title: dto.title,
      description: dto.description,
      status: dto.status,
      dueDates: dto.dueDates,
    });

    return new ReminderResponseDto(
      reminder.getId(),
      reminder.getTitle(),
      reminder.getDescription(),
      reminder.getStatus(),
      reminder.getDueDates().map((dueDate) => dueDate.getDate()),
      reminder.getCreatedAt(),
      reminder.getUpdatedAt(),
    );
  }
}
