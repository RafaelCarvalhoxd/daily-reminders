import { DueDate } from 'src/modules/reminder/entity/due-date.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export class Reminder {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _isActive: boolean;
  private readonly _status: ReminderStatusEnum;
  private readonly _dueDates: DueDate[];
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    isActive: boolean,
    status: ReminderStatusEnum,
    dueDates: DueDate[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._isActive = isActive;
    this._status = status;
    this._dueDates = dueDates;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
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
}
