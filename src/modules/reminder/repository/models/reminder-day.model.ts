import { Day } from 'src/modules/reminder/entity/day.entity';
import { DayModel } from 'src/modules/reminder/repository/models/day.model';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reminders_days')
export class ReminderDayModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => ReminderModel, (reminder) => reminder.reminderDays)
  @JoinColumn({ name: 'reminder_id' })
  reminder: ReminderModel;

  @ManyToOne(() => DayModel, (day) => day.reminderDays)
  @JoinColumn({ name: 'day_id' })
  day: DayModel;

  @Column({ name: 'time', type: 'time' })
  time: string;

  toEntity(): { day: Day; time: string } {
    return {
      day: new Day(this.day.id, this.day.name),
      time: this.time,
    };
  }
}
