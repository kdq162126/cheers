import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import * as env from 'dotenv';
import { LoggerFactory } from './common/logger/logger.factory';
import { LoggerInterceptor } from './common/logger/logger.interceptor';
env.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('SERVER'),
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.use(function (req, _, next) {
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
  });

  app.enableCors({
    origin: '*',
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Observe',
      'Authorization',
      'access-control-allow-origin',
    ],
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
