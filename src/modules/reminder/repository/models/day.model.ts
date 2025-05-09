import { Day } from 'src/modules/reminder/entity/day.entity';
import { ReminderDayModel } from 'src/modules/reminder/repository/models/reminder-day.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('day')
export class DayModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => ReminderDayModel, (reminderDay) => reminderDay.day)
  reminderDays: ReminderDayModel[];

  toEntity(): Day {
    return new Day(this.id, this.name);
  }
}
