/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHealthz(): string {
    return JSON.stringify({
      status: 'Live',
      code: 200,
    });
  }
}
