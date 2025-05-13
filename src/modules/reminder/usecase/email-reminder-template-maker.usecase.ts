import { Injectable } from '@nestjs/common';
import { Reminder } from 'src/modules/reminder/entity/reminder.entity';

@Injectable()
export class ReminderEmailTemplateMakerUseCase {
  execute(reminder: Reminder): string {
    const user = reminder.getUser();
    const days = reminder.getDays();
    const dueDates = reminder.getDueDates();
    const createdAt = reminder.getCreatedAt().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    const daysList = days.length
      ? days
          .map((d) => `${d.day.getName()} às ${d.time.slice(0, 5)}`)
          .join('<br>')
      : 'Nenhum dia recorrente configurado';

    const dueDatesList = dueDates.length
      ? dueDates
          .map((d) =>
            d
              .getDate()
              .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          )
          .join('<br>')
      : 'Nenhuma data de vencimento configurada';

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lembrete: ${reminder.getTitle()}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 20px auto;">
          <!-- Cabeçalho -->
          <tr>
            <td style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="margin: 0; font-size: 24px;">Daily Reminder</h1>
              <p style="margin: 5px 0 0; font-size: 16px;">${reminder.getTitle()}</p>
            </td>
          </tr>
          <!-- Corpo -->
          <tr>
            <td style="padding: 20px;">
              <h2 style="font-size: 20px; color: #333333; margin: 0 0 10px;">Olá, ${user.getName()}!</h2>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;">
                Este é um lembrete para a tarefa <strong>${reminder.getTitle()}</strong>. Aqui estão os detalhes:
              </p>
              <table style="width: 100%; margin: 15px 0; font-size: 16px; color: #555555;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Descrição:</td>
                  <td style="padding: 8px 0;">${reminder.getDescription()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Status:</td>
                  <td style="padding: 8px 0;">${reminder.getStatus()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Dias Recorrentes:</td>
                  <td style="padding: 8px 0;">${daysList}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Datas de Vencimento:</td>
                  <td style="padding: 8px 0;">${dueDatesList}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Criado em:</td>
                  <td style="padding: 8px 0;">${createdAt}</td>
                </tr>
              </table>
              </table>
            </td>
          </tr>
          <!-- Rodapé -->
          <tr>
            <td style="background-color: #f8f9fa; text-align: center; padding: 15px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 14px; color: #777777;">
              <p style="margin: 0;">Daily Reminders © 2025</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}
