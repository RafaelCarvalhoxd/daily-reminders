import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderController } from 'src/modules/reminder/controller/reminder.controller';
import { DayModel } from 'src/modules/reminder/repository/models/day.model';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.model';
import { ReminderDayModel } from 'src/modules/reminder/repository/models/reminder-day.model';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.model';
import { ReminderRepository } from 'src/modules/reminder/repository/reminder.repository';
import { CreateReminderService } from 'src/modules/reminder/service/create-reminder.service';
import { CreateReminderUseCase } from 'src/modules/reminder/usecase/create-reminder.usecase';
import { ListReminderUseCase } from 'src/modules/reminder/usecase/list-reminder.usecase';
import { UserModule } from 'src/modules/user/user.module';

const providers = [
  CreateReminderUseCase,
  {
    provide: 'ICreateReminderService',
    useClass: CreateReminderService,
  },
  {
    provide: 'IReminderRepository',
    useClass: ReminderRepository,
  },
  ListReminderUseCase,
  {
    provide: 'IListReminderService',
    useClass: ListReminderUseCase,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReminderModel,
      DueDateModel,
      ReminderDayModel,
      DayModel,
    ]),
    UserModule,
  ],
  controllers: [ReminderController],
  providers: [...providers],
  exports: [...providers],
})
export class ReminderModule {}
