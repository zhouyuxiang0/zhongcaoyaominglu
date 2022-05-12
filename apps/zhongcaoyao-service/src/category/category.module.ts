import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CommandHandlers } from './commands/handler';
import { EventHandlers } from './events/handler';
import { Category } from './models/category.entity';
import { CategorySagas } from './sagas/category.saga';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), CqrsModule],
  providers: [
    CategoryResolver,
    CategoryService,
    ...CommandHandlers,
    ...EventHandlers,
    CategorySagas,
  ],
})
export class CategoryModule {}
