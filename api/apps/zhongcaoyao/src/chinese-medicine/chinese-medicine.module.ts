import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { Category } from '../category/entities/category.entity';
import { Passage } from '../common/entities/passage.entity';
import { MeridianTropism } from '../meridian-tropism/entities/meridian-tropism.entity';
import { Nature } from '../nature/entities/nature.entity';
import { Taste } from '../taste/entities/taste.entity';
import { ChineseMedicineController } from './chinese-medicine.controller';
import { ChineseMedicineService } from './chinese-medicine.service';
import { ChineseMedicineAlias } from './entities/chinese-medicine-alias.entity';
import { ChineseMedicine } from './entities/chinese-medicine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChineseMedicine,
      ChineseMedicineAlias,
      Category,
      Nature,
      MeridianTropism,
      Taste,
      Passage,
    ]),
    CategoryModule,
  ],
  controllers: [ChineseMedicineController],
  providers: [ChineseMedicineService],
})
export class ChineseMedicineModule {}
