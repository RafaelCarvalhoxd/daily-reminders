import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';
import { Type } from 'class-transformer';

export class DayDto {
  @ApiProperty({
    description: 'The ID of the day.',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The time associated with the day.',
    example: '08:00:00',
  })
  @IsNotEmpty()
  @IsString()
  time: string;
}

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
    description: 'Indicates if the reminder is active.',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

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
  @IsOptional()
  @IsDateString({}, { each: true })
  dueDates: Date[];

  @ApiProperty({
    description: 'The days and times associated with the reminder.',
    example: [
      { id: '1', time: '08:00:00' },
      { id: '2', time: '10:00:00' },
    ],
    type: [DayDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayDto)
  days?: DayDto[];
}
