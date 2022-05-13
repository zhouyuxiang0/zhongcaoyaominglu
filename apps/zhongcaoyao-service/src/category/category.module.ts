import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CommandHandlers } from './cqrs/commands/handler';
import { EventHandlers } from './cqrs/events/handler';
import { Category } from './models/category.entity';
import { CategorySagas } from './cqrs/sagas/category.saga';

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
