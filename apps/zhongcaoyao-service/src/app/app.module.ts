import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { CommonModule } from '../common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CommonModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
