/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { PORTS } from 'apps/ports';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });
  app.register(compression);
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || PORTS.ZHONGCAOYAO;
  await app.listen(port, '127.0.0.1');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
