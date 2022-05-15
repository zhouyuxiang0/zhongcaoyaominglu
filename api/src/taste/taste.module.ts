import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taste } from './entities/taste.entity';
import { TasteResolver } from './taste.resolver';
import { TasteService } from './taste.service';

@Module({
  imports: [TypeOrmModule.forFeature([Taste])],
  providers: [TasteResolver, TasteService],
})
export class TasteModule {}
