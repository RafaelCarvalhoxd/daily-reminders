import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { IScheduleReminderNotificationService } from 'src/modules/reminder/interfaces/service/schedule-reminder-notification.service';
import { ScheduleRecurringReminderNotificationUseCase } from 'src/modules/reminder/usecase/schedule-recurring-reminder-notification.usecase';
import { ScheduleReminderNotificationUseCase } from 'src/modules/reminder/usecase/schedule-reminder-notification.usecase';

@Injectable()
export class ScheduleReminderNotificationService
  implements IScheduleReminderNotificationService
{
  constructor(
    private readonly scheduleReminderNotificationRecurringUseCase: ScheduleRecurringReminderNotificationUseCase,
    private readonly scheduleReminderNotificationUseCase: ScheduleReminderNotificationUseCase,
  ) {}

  async execute(reminder: Reminder): Promise<void> {
    if (!reminder.getIsActive()) return;

    if (reminder.getDueDates()) {
      for (const dueDate of reminder.getDueDates()) {
        const delay = dueDate.getDate().getTime() - new Date().getTime();
        if (delay > 0) {
          await this.scheduleReminderNotificationUseCase.execute(
            reminder.getId(),
            delay,
          );
        }
      }
    }

    if (reminder.getDays()) {
      for (const day of reminder.getDays()) {
        const cronDay = this.mapDayIdToCron(day.day.getId());
        const [hour, minute] = day.time.split(':');
        const cronExpression = `${minute} ${hour} * * ${cronDay}`;
        await this.scheduleReminderNotificationRecurringUseCase.execute(
          reminder.getId(),
          cronExpression,
          `reminder:${reminder.getId()}:day:${day.day.getId()}`,
        );
      }
    }
  }

  @OnEvent('reminder.created')
  async handleReminderCreatedEvent(event: Reminder): Promise<void> {
    console.log('Reminder created event received:', event);
    await this.execute(event);
  }

  private mapDayIdToCron(dayId: number): string {
    switch (dayId) {
      case 1:
        return '1';
      case 2:
        return '2';
      case 3:
        return '3';
      case 4:
        return '4';
      case 5:
        return '5';
      case 6:
        return '6';
      case 7:
        return '0';
      default:
        throw new Error('Invalid day id');
    }
  }
}
