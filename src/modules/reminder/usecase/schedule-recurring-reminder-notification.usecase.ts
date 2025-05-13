import { Inject, Injectable } from '@nestjs/common';
import { IBullLib } from 'src/shared/libs/bull/interface/bull-lib.interface';

@Injectable()
export class ScheduleRecurringReminderNotificationUseCase {
  constructor(
    @Inject('IBullLib')
    private readonly bullLib: IBullLib,
  ) {}

  async execute(
    reminderId: string,
    cronExpression: string,
    jobId: string,
  ): Promise<void> {
    await this.bullLib.add(
      'sendReminder',
      { reminderId },
      { repeat: { cron: cronExpression }, jobId },
    );
  }
}
