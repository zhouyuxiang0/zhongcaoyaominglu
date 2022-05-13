import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CategoryService } from '../../../category.service';
import { UpdateCategoryCommand } from '../impl/update-category.command';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  @Inject() private readonly categoryService: CategoryService;
  @Inject() private readonly publisher: EventPublisher;

  async execute(command: UpdateCategoryCommand): Promise<any> {
    const { updateCategoryInput } = command;
    const category = await this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput
    );
    this.publisher.mergeObjectContext(category);
    category.updateCategory();
    category.commit();
    return category;
  }
}
