import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taste } from './entities/taste.entity';
import { TasteController } from './taste.controller';
import { TasteService } from './taste.service';

@Module({
  imports: [TypeOrmModule.forFeature([Taste])],
  controllers: [TasteController],
  providers: [TasteService],
})
export class TasteModule {}
