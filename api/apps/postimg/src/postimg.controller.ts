import { Controller, Get } from '@nestjs/common';
import { PostimgService } from './postimg.service';

@Controller()
export class PostimgController {
  constructor(private readonly postimgService: PostimgService) {}

  @Get()
  getHello(): string {
    return this.postimgService.getHello();
  }
}
