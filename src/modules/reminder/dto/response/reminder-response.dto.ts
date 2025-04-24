export class ReminderResponseDto {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly isActive: boolean;
  public readonly status: string;
  public readonly dueDates: {
    date: Date;
  }[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    isActive: boolean,
    status: string,
    dueDates: Date[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isActive = isActive;
    this.status = status;
    this.dueDates = dueDates.map((date) => ({ date }));
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
