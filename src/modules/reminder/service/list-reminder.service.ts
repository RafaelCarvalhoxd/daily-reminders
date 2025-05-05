import { Injectable } from '@nestjs/common';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { IListReminderService } from 'src/modules/reminder/interfaces/service/list-reminder.service';
import { ListReminderUseCase } from 'src/modules/reminder/usecase/list-reminder.usecase';

@Injectable()
export class ListReminderService implements IListReminderService {
  constructor(private readonly listReminderUseCase: ListReminderUseCase) {}

  async execute(
    input: {
      title?: string;
    },
    userId: number,
  ): Promise<Reminder[]> {
    return await this.listReminderUseCase.execute(input, userId);
  }
}
