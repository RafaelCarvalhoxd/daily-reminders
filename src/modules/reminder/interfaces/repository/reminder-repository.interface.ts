import { Day } from 'src/modules/reminder/entity/day.entity';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export interface IReminderRepository {
  createReminder(
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
  ): Promise<Reminder>;

  listReminder(
    input: {
      title?: string;
    },
    userId: number,
  ): Promise<Reminder[]>;

  findDay(input: { ids: number[] }): Promise<Day[]>;

  findReminder(input: { id: string }): Promise<Reminder | undefined>;
}
