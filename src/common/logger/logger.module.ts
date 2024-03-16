import { Module, Global } from '@nestjs/common';
import { LoggerFactory } from './logger.factory';

@Global()
@Module({
  providers: [
    {
      provide: 'Logger',
      useFactory: () => LoggerFactory('SERVER'),
    },
  ],
  exports: ['Logger'],
})
export class LoggerModule {}
