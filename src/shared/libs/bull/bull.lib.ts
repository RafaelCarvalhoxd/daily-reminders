import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IBullLib } from 'src/shared/libs/bull/interface/bull-lib.interface';

@Injectable()
export class BullLib implements IBullLib {
  constructor(@InjectQueue('reminder') private readonly queue: Queue) {}

  async add(
    taskName: string,
    data: object,
    options?: { delay?: number; repeat?: { cron: string }; jobId?: string },
  ): Promise<void> {
    await this.queue.add(taskName, data, {
      delay: options?.delay,
      repeat: options?.repeat,
      jobId: options?.jobId,
    });
  }
}
