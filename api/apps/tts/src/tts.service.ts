import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PassThrough } from 'stream';
import { execSync } from 'child_process';

@Injectable()
export class TtsService {
  async getHello(body, res: Response) {
    const buf = execSync(body.command);
    const passThrough = new PassThrough();
    res.set('Content-Type', 'audio/mpeg');
    passThrough.end(buf);
    passThrough.pipe(res);
  }
}
