import { Module } from '@nestjs/common';
import { MeridianTropismService } from './meridian-tropism.service';
import { MeridianTropismResolver } from './meridian-tropism.resolver';

@Module({
  providers: [MeridianTropismResolver, MeridianTropismService],
})
export class MeridianTropismModule {}
