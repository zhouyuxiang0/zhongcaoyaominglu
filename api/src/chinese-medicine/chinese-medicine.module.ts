import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChineseMedicineController } from './chinese-medicine.controller';
import { ChineseMedicineService } from './chinese-medicine.service';
import { ChineseMedicineAlias } from './entities/chinese-medicine-alias.entity';
import { ChineseMedicine } from './entities/chinese-medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChineseMedicine, ChineseMedicineAlias])],
  controllers: [ChineseMedicineController],
  providers: [ChineseMedicineService],
})
export class ChineseMedicineModule {}
