import { Module } from '@nestjs/common';
import { NatureService } from './nature.service';
import { NatureResolver } from './nature.resolver';

@Module({
  providers: [NatureResolver, NatureService],
})
export class NatureModule {}
