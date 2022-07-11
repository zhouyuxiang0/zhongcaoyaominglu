import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { query, Response } from 'express';
import { TtsService } from './tts.service';

@Controller()
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Get()
  getHello(@Query('msg') msg, @Res() res: Response) {
    return this.ttsService.getHello(res, msg);
  }
}
