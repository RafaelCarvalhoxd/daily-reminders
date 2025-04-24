import { Reminder } from 'src/modules/reminder/entity/reminder.entity';

export class DueDate {
  private readonly _id: string;
  private readonly _date: Date;
  private readonly _reminder: Reminder;

  constructor(id: string, date: Date, reminder: Reminder) {
    this._id = id;
    this._date = date;
    this._reminder = reminder;
  }

  public getId(): string {
    return this._id;
  }

  public getDate(): Date {
    return this._date;
  }

  public getReminder(): Reminder {
    return this._reminder;
  }
}
