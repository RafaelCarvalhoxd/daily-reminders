import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailerLib } from 'src/shared/libs/mail/interface/mailer-lib.interface';

@Injectable()
export class MailerLib implements IMailerLib {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(input: {
    to: string;
    subject: string;
    htmlContent?: string;
    textContent?: string;
  }): Promise<void> {
    await this.mailerService
      .sendMail({
        to: input.to,
        subject: input.subject,
        html: input.htmlContent,
        text: input.textContent,
      })
      .catch((error) => {
        throw new Error('Failed to send email', error as undefined);
      });
  }
}
