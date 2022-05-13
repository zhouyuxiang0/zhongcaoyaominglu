import { Module } from '@nestjs/common';
import { TasteService } from './taste.service';
import { TasteResolver } from './taste.resolver';

@Module({
  providers: [TasteResolver, TasteService],
})
export class TasteModule {}
