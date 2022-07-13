import { Injectable, Logger } from '@nestjs/common';
import { execSync } from 'child_process';
import { Response } from 'express';
import { createHash } from 'crypto';

@Injectable()
export class TtsService {
  private readonly logger = new Logger(TtsService.name);
  async getHello(res: Response, msg: string) {
    const fileName = createHash('md5').update(msg).digest().toString();
    // const buf = execSync(`paddlespeech tts --input ${msg} --output a.wav`);
    execSync(
      `/root/miniconda3/bin/paddlespeech_client tts_online --server_ip 127.0.0.1 --port 8092 --protocol http --input ${msg} --output /app/audio/${fileName}.wav`,
    );
    this.logger.log(`生成/app/audio/${fileName}.wav`);
    return res.sendFile(`/audio/${fileName}.wav`);
  }
}
