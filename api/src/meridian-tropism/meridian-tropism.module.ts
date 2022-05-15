import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeridianTropism } from './entities/meridian-tropism.entity';
import { MeridianTropismResolver } from './meridian-tropism.resolver';
import { MeridianTropismService } from './meridian-tropism.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeridianTropism])],
  providers: [MeridianTropismResolver, MeridianTropismService],
})
export class MeridianTropismModule {}
