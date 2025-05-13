import { Global, Module } from '@nestjs/common';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { EventEmitterLib } from 'src/shared/libs/event-emitter/event-emitter.lib';

const providers = [
  {
    provide: 'EventEmitter2',
    useFactory: (eventEmitter: EventEmitter2) => eventEmitter,
    inject: [EventEmitter2],
  },
  {
    provide: 'IEventEmitterLib',
    useFactory: (eventEmitter: EventEmitter2) =>
      new EventEmitterLib(eventEmitter),
    inject: ['EventEmitter2'],
  },
];

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [...providers],
  exports: [...providers],
})
export class EventEmitterServiceModule {}
