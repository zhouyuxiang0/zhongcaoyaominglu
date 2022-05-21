import { Module } from '@nestjs/common';
import { MeridianTropismService } from './meridian-tropism.service';
import { MeridianTropismController } from './meridian-tropism.controller';

@Module({
  controllers: [MeridianTropismController],
  providers: [MeridianTropismService]
})
export class MeridianTropismModule {}
