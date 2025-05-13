import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { IReminderRepository } from 'src/modules/reminder/interfaces/repository/reminder-repository.interface';
import { ReminderEmailTemplateMakerUseCase } from 'src/modules/reminder/usecase/email-reminder-template-maker.usecase';
import { IMailerLib } from 'src/shared/libs/mail/interface/mailer-lib.interface';

@Processor('reminder')
export class ReminderProcessor {
  constructor(
    @Inject('IMailerLib')
    private readonly mailLib: IMailerLib,
    @Inject('IReminderRepository')
    private readonly reminderRepository: IReminderRepository,
    private readonly emailReminderTemplateMaker: ReminderEmailTemplateMakerUseCase,
  ) {}

  @Process('sendReminder')
  async handleSendReminder(job: Job) {
    const { reminderId }: { reminderId: { id: string } } = job.data;
    const reminder = await this.reminderRepository.findReminder(reminderId);
    const htmlContent = this.emailReminderTemplateMaker.execute(reminder!);
    if (reminder && reminder.getIsActive()) {
      await this.mailLib.sendMail({
        to: reminder.getUser().getEmail(),
        subject: 'Reminder Notification',
        htmlContent,
      });
      console.log(
        `Reminder notification sent to ${reminder.getUser().getEmail()}`,
      );
    }
  }
}
