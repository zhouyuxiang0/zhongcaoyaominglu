import { Module } from '@nestjs/common';
import { ChineseMedicineService } from './chinese-medicine.service';
import { ChineseMedicineController } from './chinese-medicine.controller';

@Module({
  controllers: [ChineseMedicineController],
  providers: [ChineseMedicineService]
})
export class ChineseMedicineModule {}
