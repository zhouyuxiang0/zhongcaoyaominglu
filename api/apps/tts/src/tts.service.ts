import { Injectable, Logger } from '@nestjs/common';
import { execSync } from 'child_process';
import { Response } from 'express';
import { createHash } from 'crypto';
import { existsSync } from 'fs';

@Injectable()
export class TtsService {
  private readonly logger = new Logger(TtsService.name);
  async getHello(res: Response, msg: string) {
    const command = `/root/miniconda3/bin/paddlespeech_client tts_online --server_ip 127.0.0.1 --port 8092 --protocol http --input ${msg}`;
    const fileName = createHash('md5').update(command).digest('hex');
    if (!existsSync(`/app/audio/${fileName}.wav`)) {
      execSync(`${command} --output /app/audio/${fileName}.wav`);
      this.logger.log(`生成/app/audio/${fileName}.wav`);
    }
    return res.sendFile(`/app/audio/${fileName}.wav`);
  }
}
