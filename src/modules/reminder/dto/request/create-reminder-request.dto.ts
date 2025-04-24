import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export class CreateReminderRequestDto {
  @ApiProperty({
    description: 'The title of the reminder.',
    example: 'Buy groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the reminder.',
    example: 'Remember to buy milk, eggs, and bread.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The status of the reminder.',
    example: 'PENDING',
    enum: ReminderStatusEnum,
  })
  @IsEnum(ReminderStatusEnum)
  @IsNotEmpty()
  status: ReminderStatusEnum;

  @ApiProperty({
    description: 'The due dates for the reminder.',
    example: ['2023-10-01T10:00:00Z', '2023-10-02T15:00:00Z'],
    type: [String],
  })
  @IsNotEmpty()
  @IsDateString({}, { each: true })
  dueDates: Date[];
}
