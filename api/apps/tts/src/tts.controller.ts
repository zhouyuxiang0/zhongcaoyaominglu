import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TtsService } from './tts.service';

@Controller()
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Get()
  getHello(@Body() body, @Res() res: Response) {
    return this.ttsService.getHello(res, body.msg);
  }
}
