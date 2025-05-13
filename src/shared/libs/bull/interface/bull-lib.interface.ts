export interface IBullLib {
  add(
    taskName: string,
    data: object,
    options?: { delay?: number; repeat?: { cron: string }; jobId?: string },
  ): Promise<void>;
}
