import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { IReminderRepository } from 'src/modules/reminder/interfaces/repository/reminder-repository.interface';

export class CreateReminderUseCase {
  constructor(private readonly reminderRepository: IReminderRepository) {}

  async execute(input: {
    title: string;
    description: string;
    status: ReminderStatusEnum;
    dueDates: Date[];
  }): Promise<Reminder> {
    const reminder = await this.reminderRepository.createReminder({
      title: input.title,
      description: input.description,
      status: input.status,
      dueDates: input.dueDates,
    });

    return reminder;
  }
}
