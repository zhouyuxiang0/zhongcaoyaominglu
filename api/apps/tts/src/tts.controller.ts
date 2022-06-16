import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TtsService } from './tts.service';

@Controller()
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post()
  getHello(@Body() body, @Res() res: Response) {
    return this.ttsService.getHello(body, res);
  }
}
