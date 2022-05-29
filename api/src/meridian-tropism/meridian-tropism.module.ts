import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeridianTropism } from './entities/meridian-tropism.entity';
import { MeridianTropismController } from './meridian-tropism.controller';
import { MeridianTropismService } from './meridian-tropism.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeridianTropism])],
  controllers: [MeridianTropismController],
  providers: [MeridianTropismService],
})
export class MeridianTropismModule {}
