import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { IReminderRepository } from 'src/modules/reminder/interfaces/repository/reminder-repository.interface';

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
      dueDates?: Date[];
      days?: {
        id: number;
        time: string;
      }[];
    },
    userId: number,
  ): Promise<Reminder> {
    if (input.days) {
      const days = await this.reminderRepository.findDay({
        ids: input.days.map((day) => day.id),
      });
      if (days.length !== input.days.length) {
        throw new NotFoundException('Some days do not exist');
      }
    }
    const reminder = await this.reminderRepository.createReminder(
      {
        title: input.title,
        description: input.description,
        isActive: input.isActive,
        status: input.status,
        dueDates: input.dueDates,
        days: input.days,
      },
      userId,
    );

    return reminder;
  }
}
