import { Module } from '@nestjs/common';
import { NatureService } from './nature.service';
import { NatureController } from './nature.controller';

@Module({
  controllers: [NatureController],
  providers: [NatureService]
})
export class NatureModule {}
