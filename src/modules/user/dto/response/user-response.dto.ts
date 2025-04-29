import { User } from 'src/modules/user/entity/user.entity';

export class UserResponseDto {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly phoneNumber: string;
  public readonly password: string;
  public readonly emailReminderEnabled: boolean;
  public readonly smsReminderEnabled: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

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
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.emailReminderEnabled = emailReminderEnabled;
    this.smsReminderEnabled = smsReminderEnabled;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static toJson(entity: User): UserResponseDto {
    return new UserResponseDto(
      entity.getId(),
      entity.getName(),
      entity.getEmail(),
      entity.getPhoneNumber(),
      entity.getPassword(),
      entity.getEmailReminderEnabled(),
      entity.getSmsReminderEnabled(),
      entity.getCreatedAt(),
      entity.getUpdatedAt(),
    );
  }
}
