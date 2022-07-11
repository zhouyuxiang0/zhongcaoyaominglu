import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { Response } from 'express';

@Injectable()
export class TtsService {
  async getHello(res: Response, msg: string) {
    // const buf = execSync(`paddlespeech tts --input ${msg} --output a.wav`);
    const buf = execSync(
      `/root/miniconda3/bin/paddlespeech tts --input ${msg} --output /app/a.wav`,
    ).toString();
    return res.sendFile('/app/a.wav');
  }
}
