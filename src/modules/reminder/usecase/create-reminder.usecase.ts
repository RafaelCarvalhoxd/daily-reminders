import { Inject, Injectable } from '@nestjs/common';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { IReminderRepository } from 'src/modules/reminder/interfaces/repository/reminder-repository.interface';
// import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class CreateReminderUseCase {
  constructor(
    @Inject('IReminderRepository')
    private readonly reminderRepository: IReminderRepository,
  ) {}

  async execute(
    input: {
      title: string;
      description: string;
      isActive: boolean;
      status: ReminderStatusEnum;
      dueDates: Date[];
    },
    user: number,
  ): Promise<Reminder> {
    const reminder = await this.reminderRepository.createReminder(
      {
        title: input.title,
        description: input.description,
        isActive: input.isActive,
        status: input.status,
        dueDates: input.dueDates,
      },
      user,
    );

    return reminder;
  }
}
