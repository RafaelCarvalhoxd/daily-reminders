import { Inject, Injectable } from '@nestjs/common';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { IReminderRepository } from 'src/modules/reminder/interfaces/repository/reminder-repository.interface';

@Injectable()
export class ListReminderUseCase {
  constructor(
    @Inject('IReminderRepository')
    private readonly reminderRepository: IReminderRepository,
  ) {}

  async execute(
    input: {
      title?: string;
    },
    userId: number,
  ): Promise<Reminder[]> {
    const reminder = await this.reminderRepository.listReminder(
      {
        title: input.title,
      },
      userId,
    );

    return reminder;
  }
}
