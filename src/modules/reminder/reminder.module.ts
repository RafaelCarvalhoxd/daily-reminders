import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderController } from 'src/modules/reminder/controller/reminder.controller';
import { ReminderProcessor } from 'src/modules/reminder/job/reminder.job';
import { DayModel } from 'src/modules/reminder/repository/models/day.model';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.model';
import { ReminderDayModel } from 'src/modules/reminder/repository/models/reminder-day.model';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.model';
import { ReminderRepository } from 'src/modules/reminder/repository/reminder.repository';
import { CreateReminderService } from 'src/modules/reminder/service/create-reminder.service';
import { ScheduleReminderNotificationService } from 'src/modules/reminder/service/schedule-reminder-notification.service';
import { CreateReminderUseCase } from 'src/modules/reminder/usecase/create-reminder.usecase';
import { ReminderEmailTemplateMakerUseCase } from 'src/modules/reminder/usecase/email-reminder-template-maker.usecase';
import { ListReminderUseCase } from 'src/modules/reminder/usecase/list-reminder.usecase';
import { ScheduleRecurringReminderNotificationUseCase } from 'src/modules/reminder/usecase/schedule-recurring-reminder-notification.usecase';
import { ScheduleReminderNotificationUseCase } from 'src/modules/reminder/usecase/schedule-reminder-notification.usecase';
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
  {
    provide: 'IScheduleReminderNotificationService',
    useClass: ScheduleReminderNotificationService,
  },
  ScheduleReminderNotificationUseCase,
  ScheduleRecurringReminderNotificationUseCase,
  ReminderProcessor,
  ReminderEmailTemplateMakerUseCase,
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
