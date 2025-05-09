import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.model';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.model';
import { UserModel } from 'src/modules/user/repository/models/user.model';
import { DayModel } from 'src/modules/reminder/repository/models/day.model';
import { ReminderDayModel } from 'src/modules/reminder/repository/models/reminder-day.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [
          ReminderModel,
          DueDateModel,
          ReminderDayModel,
          DayModel,
          UserModel,
        ],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
