import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { IEventEmitterLib } from 'src/shared/libs/event-emitter/interface/event-emitter-lib.interface';

@Injectable()
export class EventEmitterLib implements IEventEmitterLib {
  constructor(
    @Inject('EventEmitter2') private readonly eventEmitter: EventEmitter2,
  ) {}

  emit(event: string, ...args: object[]): void {
    this.eventEmitter.emit(event, ...args);
  }
}
