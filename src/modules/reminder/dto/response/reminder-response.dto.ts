import { Reminder } from 'src/modules/reminder/entity/reminder.entity';

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
  public readonly user: {
    id: number;
    name: string;
  };

  constructor(
    id: string,
    title: string,
    description: string,
    isActive: boolean,
    status: string,
    dueDates: Date[],
    createdAt: Date,
    updatedAt: Date,
    user: {
      id: number;
      name: string;
    },
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isActive = isActive;
    this.status = status;
    this.dueDates = dueDates.map((date) => ({ date }));
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }

  static toJson(entity: Reminder): ReminderResponseDto {
    return new ReminderResponseDto(
      entity.getId(),
      entity.getTitle(),
      entity.getDescription(),
      entity.getIsActive(),
      entity.getStatus(),
      entity.getDueDates().map((dueDate) => dueDate.getDate()),
      entity.getCreatedAt(),
      entity.getUpdatedAt(),
      {
        id: entity.getUser().getId(),
        name: entity.getUser().getName(),
      },
    );
  }
}
