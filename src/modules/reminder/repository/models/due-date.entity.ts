import { DueDate } from 'src/modules/reminder/entity/due-date.entity';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('due_dates')
export class DueDateModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'date' })
  date: Date;

  @ManyToOne(() => ReminderModel, (reminder) => reminder.dueDates)
  @JoinColumn({ name: 'reminder_id' })
  reminder: ReminderModel;

  toEntity(): DueDate {
    return new DueDate(this.id, this.date, this.reminder.toEntity());
  }
}
