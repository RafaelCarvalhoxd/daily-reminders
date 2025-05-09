import { Day } from 'src/modules/reminder/entity/day.entity';
import { DueDate } from 'src/modules/reminder/entity/due-date.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { User } from 'src/modules/user/entity/user.entity';
export class Reminder {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _isActive: boolean;
  private readonly _status: ReminderStatusEnum;
  private readonly _dueDates: DueDate[];
  private readonly _days: { day: Day; time: string }[];
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _user: User;

  constructor(
    id: string,
    title: string,
    description: string,
    isActive: boolean,
    status: ReminderStatusEnum,
    dueDates: DueDate[],
    days: { day: Day; time: string }[],
    createdAt: Date,
    updatedAt: Date,
    user: User,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._isActive = isActive;
    this._status = status;
    this._dueDates = dueDates;
    this._days = days;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._user = user;
  }

  public getId(): string {
    return this._id;
  }

  public getTitle(): string {
    return this._title;
  }

  public getDescription(): string {
    return this._description;
  }

  public getIsActive(): boolean {
    return this._isActive;
  }

  public getStatus(): ReminderStatusEnum {
    return this._status;
  }

  public getDueDates(): DueDate[] {
    return this._dueDates;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getUpdatedAt(): Date {
    return this._updatedAt;
  }

  public getUser(): User {
    return this._user;
  }

  public getDays(): { day: Day; time: string }[] {
    return this._days;
  }
}
