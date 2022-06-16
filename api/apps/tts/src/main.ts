import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PORTS } from 'apps/ports';
import { TtsModule } from './tts.module';

async function bootstrap() {
  const app = await NestFactory.create(TtsModule);
  const globalPrefix = '';
  await app.listen(PORTS.TTS);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORTS.TTS}/${globalPrefix}`,
  );
}
bootstrap();
