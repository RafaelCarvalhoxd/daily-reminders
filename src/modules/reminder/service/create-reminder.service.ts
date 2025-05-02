import { Injectable } from '@nestjs/common';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { ICreateReminderService } from 'src/modules/reminder/interfaces/service/create-reminder.service';
import { CreateReminderUseCase } from 'src/modules/reminder/usecase/create-reminder.usecase';

@Injectable()
export class CreateReminderService implements ICreateReminderService {
  constructor(private readonly createReminderUseCase: CreateReminderUseCase) {}

  async execute(
    input: {
      title: string;
      description: string;
      isActive: boolean;
      status: ReminderStatusEnum;
      dueDates: Date[];
    },
    userId: number,
  ): Promise<Reminder> {
    return await this.createReminderUseCase.execute(input, userId);
  }
}
