import { Injectable } from '@nestjs/common';
import { Day } from 'src/modules/reminder/entity/day.entity';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { IReminderRepository } from 'src/modules/reminder/interfaces/repository/reminder-repository.interface';
import { DayModel } from 'src/modules/reminder/repository/models/day.model';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.model';
import { ReminderDayModel } from 'src/modules/reminder/repository/models/reminder-day.model';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.model';
import { DataSource, ILike, In } from 'typeorm';

@Injectable()
export class ReminderRepository implements IReminderRepository {
  constructor(private readonly ds: DataSource) {}

  async createReminder(
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

      if (input.dueDates) {
        const dueDateRepository = manager.getRepository(DueDateModel);

        const dueDates = input.dueDates.map((date) => {
          return dueDateRepository.create({
            reminder: {
              id: savedReminder.id,
            },
            date,
          });
        });

        await dueDateRepository.save(dueDates);
      }

      if (input.days) {
        const reminderDayRepository = manager.getRepository(ReminderDayModel);

        const reminderDays = input.days.map((day) => {
          return reminderDayRepository.create({
            reminder: {
              id: savedReminder.id,
            },
            day: {
              id: day.id,
            },
            time: day.time,
          });
        });

        await reminderDayRepository.save(reminderDays);
      }

      return savedReminder.toEntity();
    });
  }

  async listReminder(
    input: { title?: string },
    userId: number,
  ): Promise<Reminder[]> {
    const repository = this.ds.getRepository(ReminderModel);

    const reminders = await repository.find({
      where: {
        ...(input.title ? { title: ILike(`%${input.title}%`) } : {}),
        user: {
          id: userId,
        },
      },
      relations: {
        dueDates: true,
        user: true,
      },
    });

    return reminders.map((reminder) => {
      return reminder.toEntity();
    });
  }

  async findDay(input: { ids: number[] }): Promise<Day[]> {
    const repository = this.ds.getRepository(DayModel);

    const days = await repository.find({
      where: {
        id: In(input.ids),
      },
    });

    return days.map((day) => {
      return day.toEntity();
    });
  }
}
