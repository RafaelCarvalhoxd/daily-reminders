import { Reminder } from 'src/modules/reminder/entity/reminder.entity';

export interface IListReminderService {
  execute(
    input: {
      title?: string;
    },
    userId: number,
  ): Promise<Reminder[]>;
}
