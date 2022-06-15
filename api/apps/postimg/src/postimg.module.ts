import { Module } from '@nestjs/common';
import { PostimgController } from './postimg.controller';
import { PostimgService } from './postimg.service';

@Module({
  imports: [],
  controllers: [PostimgController],
  providers: [PostimgService],
})
export class PostimgModule {}
