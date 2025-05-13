export interface IEventEmitterLib {
  emit(event: string, ...args: object[]): void;
}
