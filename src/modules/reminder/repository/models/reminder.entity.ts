import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reminders')
export class ReminderModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({
    type: 'enum',
    enum: ReminderStatusEnum,
    name: 'status',
  })
  status: ReminderStatusEnum;

  @OneToMany(() => DueDateModel, (dueDate) => dueDate.reminder, {
    cascade: true,
  })
  dueDates: DueDateModel[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toEntity(): Reminder {
    return ReminderModel.toEntity(this);
  }

  static toEntity(reminder: ReminderModel): Reminder {
    return new Reminder(
      reminder.id,
      reminder.title,
      reminder.description,
      reminder.status,
      reminder.dueDates?.map((dueDate) => dueDate.toEntity()) ?? [],
      reminder.createdAt,
      reminder.updatedAt,
    );
  }
}
