import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.model';
import { ReminderDayModel } from 'src/modules/reminder/repository/models/reminder-day.model';
import { UserModel } from 'src/modules/user/repository/models/user.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('reminders')
export class ReminderModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

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

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @OneToMany(() => ReminderDayModel, (reminderDay) => reminderDay.reminder)
  reminderDays: ReminderDayModel[];

  toEntity(): Reminder {
    return new Reminder(
      this.id,
      this.title,
      this.description,
      this.isActive,
      this.status,
      this.dueDates?.map((dueDate) => dueDate?.toEntity()) ?? [],
      this.reminderDays?.map((reminderDay) => ({
        day: reminderDay.toEntity().day,
        time: reminderDay.toEntity().time,
      })) ?? [],
      this.createdAt,
      this.updatedAt,
      this.user?.toEntity(),
    );
  }
}
