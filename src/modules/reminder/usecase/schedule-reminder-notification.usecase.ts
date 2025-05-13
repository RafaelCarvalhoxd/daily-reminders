import { Inject, Injectable } from '@nestjs/common';
import { IBullLib } from 'src/shared/libs/bull/interface/bull-lib.interface';

@Injectable()
export class ScheduleReminderNotificationUseCase {
  constructor(
    @Inject('IBullLib')
    private readonly bullLib: IBullLib,
  ) {}

  async execute(reminderId: string, delay: number): Promise<void> {
    await this.bullLib.add('sendReminder', { reminderId }, { delay });
  }
}
