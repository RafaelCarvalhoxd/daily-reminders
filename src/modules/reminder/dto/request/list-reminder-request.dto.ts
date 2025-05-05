import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListReminderRequestDto {
  @ApiProperty({
    description: 'The title of the reminder.',
    example: 'Buy groceries',
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;
}
