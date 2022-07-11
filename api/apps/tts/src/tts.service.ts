import { Injectable } from '@nestjs/common';
import { exec, execSync } from 'child_process';
import { Response } from 'express';
import { PassThrough, Readable } from 'stream';

@Injectable()
export class TtsService {
  async getHello(res: Response, msg: string) {
    const buf = execSync(`paddlespeech tts --input ${msg} --output a.wav`);
    // const buf = await text2wav('你好,世界', { voice: 'zhy' });
    const passThrough = new PassThrough();
    res.set('Content-Type', 'audio/mpeg');
    passThrough.end(buf);
    passThrough.pipe(res);
  }
}
