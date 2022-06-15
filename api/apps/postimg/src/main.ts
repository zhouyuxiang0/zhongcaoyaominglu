import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PORTS } from 'apps/ports';
import { PostimgModule } from './postimg.module';

async function bootstrap() {
  const app = await NestFactory.create(PostimgModule);
  const globalPrefix = '';
  await app.listen(PORTS.POSTIMG);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORTS.POSTIMG}/${globalPrefix}`,
  );
}
bootstrap();
