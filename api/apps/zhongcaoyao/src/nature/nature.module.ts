import { Module } from '@nestjs/common';
import { NatureService } from './nature.service';
import { NatureController } from './nature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nature } from './entities/nature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nature])],
  controllers: [NatureController],
  providers: [NatureService],
})
export class NatureModule {}
