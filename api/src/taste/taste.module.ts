import { Module } from '@nestjs/common';
import { TasteService } from './taste.service';
import { TasteController } from './taste.controller';

@Module({
  controllers: [TasteController],
  providers: [TasteService]
})
export class TasteModule {}
