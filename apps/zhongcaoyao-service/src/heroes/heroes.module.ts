import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HeroRepository } from './repository/hero-repository';
import { HeroesController } from './heroes.controller';

@Module({
  imports: [CqrsModule],
  controllers: [HeroesController],
  providers: [HeroRepository],
})
export class HeroesModule {}
