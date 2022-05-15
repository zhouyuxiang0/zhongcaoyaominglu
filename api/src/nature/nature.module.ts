import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nature } from './entities/nature.entity';
import { NatureResolver } from './nature.resolver';
import { NatureService } from './nature.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nature])],
  providers: [NatureResolver, NatureService],
})
export class NatureModule {}
