import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderController } from 'src/modules/reminder/controller/reminder.controller';
import { DueDateModel } from 'src/modules/reminder/repository/models/due-date.entity';
import { ReminderModel } from 'src/modules/reminder/repository/models/reminder.entity';
import { ReminderRepository } from 'src/modules/reminder/repository/reminder.repository';
import { CreateReminderService } from 'src/modules/reminder/service/create-reminder.service';
import { CreateReminderUseCase } from 'src/modules/reminder/usecase/create-reminder.usecase';
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
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ReminderModel, DueDateModel]),
    UserModule,
  ],
  controllers: [ReminderController],
  providers: [...providers],
  exports: [...providers],
})
export class ReminderModule {}
