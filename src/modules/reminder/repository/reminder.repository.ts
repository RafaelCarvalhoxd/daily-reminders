import { Injectable } from '@nestjs/common';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { IReminderRepository } from 'src/modules/reminder/interfaces/repository/reminder-repository.interface';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.entity';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.entity';
// import { User } from 'src/modules/user/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ReminderRepository implements IReminderRepository {
  constructor(private readonly ds: DataSource) {}

  async createReminder(
    input: {
      title: string;
      description: string;
      isActive: boolean;
      status: ReminderStatusEnum;
      dueDates: Date[];
    },
    user: number,
  ): Promise<Reminder> {
    return await this.ds.transaction(async (manager) => {
      const reminderRepository = manager.getRepository(ReminderModel);

      const reminder = reminderRepository.create({
        title: input.title,
        description: input.description,
        isActive: input.isActive,
        status: input.status,
        user: {
          id: user,
        },
      });

      const savedReminder = await reminderRepository.save(reminder);

      const dueDateRepository = manager.getRepository(DueDateModel);

      const dueDates = input.dueDates.map((dueDate) => {
        return dueDateRepository.create({
          reminder: {
            id: savedReminder.id,
          },
          date: dueDate,
        });
      });

      await dueDateRepository.save(dueDates);

      return savedReminder.toEntity();
    });
  }
}
