export class User {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _phoneNumber: string;
  private readonly _password: string;
  private readonly _emailReminderEnabled: boolean;
  private readonly _smsReminderEnabled: boolean;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    emailReminderEnabled: boolean,
    smsReminderEnabled: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._password = password;
    this._emailReminderEnabled = emailReminderEnabled;
    this._smsReminderEnabled = smsReminderEnabled;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getEmail(): string {
    return this._email;
  }

  public getPhoneNumber(): string {
    return this._phoneNumber;
  }

  public getPassword(): string {
    return this._password;
  }

  public getEmailReminderEnabled(): boolean {
    return this._emailReminderEnabled;
  }

  public getSmsReminderEnabled(): boolean {
    return this._smsReminderEnabled;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getUpdatedAt(): Date {
    return this._updatedAt;
  }
}
