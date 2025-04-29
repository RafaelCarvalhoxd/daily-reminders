import { User } from 'src/modules/user/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'email_reminder_enabled', default: true })
  emailReminderEnabled: boolean;

  @Column({ name: 'sms_reminder_enabled', default: true })
  smsReminderEnabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toEntity(): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.phoneNumber,
      this.password,
      this.emailReminderEnabled,
      this.smsReminderEnabled,
      this.createdAt,
      this.updatedAt,
    );
  }
}
