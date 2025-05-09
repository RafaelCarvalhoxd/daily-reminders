export interface IMailerLib {
  sendMail(input: {
    to: string;
    subject: string;
    htmlContent?: string;
    textContent?: string;
  }): Promise<void>;
}
