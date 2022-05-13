import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CategoryService } from '../../../category.service';
import { CreateCategoryCommand } from '../impl/create-category.command';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  @Inject() private readonly categoryService: CategoryService;
  @Inject() private readonly publisher: EventPublisher;

  async execute(command: CreateCategoryCommand): Promise<any> {
    const { createCategoryInput } = command;
    const category = this.publisher.mergeObjectContext(
      await this.categoryService.create(createCategoryInput)
    );
    category.createCategory();
    category.commit();
    return category;
  }
}
