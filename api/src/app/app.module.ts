import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { CategoryModule } from '../category/category.module';
import { ChineseMedicineModule } from '../chinese-medicine/chinese-medicine.module';
import { CommonModule } from '../common/common.module';
import { MeridianTropismModule } from '../meridian-tropism/meridian-tropism.module';
import { NatureModule } from '../nature/nature.module';
import { TasteModule } from '../taste/taste.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CommonModule,
    CategoryModule,
    ChineseMedicineModule,
    MeridianTropismModule,
    NatureModule,
    TasteModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
