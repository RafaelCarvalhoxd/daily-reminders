import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export class CreateReminderRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ReminderStatusEnum)
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsDateString({}, { each: true })
  dueDates: Date[];
}
