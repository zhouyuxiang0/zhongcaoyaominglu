import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { ChineseMedicineController } from './chinese-medicine.controller';
import { ChineseMedicineService } from './chinese-medicine.service';
import { ChineseMedicineAlias } from './entities/chinese-medicine-alias.entity';
import { ChineseMedicine } from './entities/chinese-medicine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChineseMedicine, ChineseMedicineAlias]),
    CategoryModule,
  ],
  controllers: [ChineseMedicineController],
  providers: [ChineseMedicineService],
})
export class ChineseMedicineModule {}
