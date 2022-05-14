import { Module } from '@nestjs/common';
import { ChineseMedicineService } from './chinese-medicine.service';
import { ChineseMedicineResolver } from './chinese-medicine.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChineseMedicine } from './entities/chinese-medicine.entity';
import { ChineseMedicineAlias } from './entities/chinese-medicine-alias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChineseMedicine, ChineseMedicineAlias])],
  providers: [ChineseMedicineResolver, ChineseMedicineService],
})
export class ChineseMedicineModule {}
