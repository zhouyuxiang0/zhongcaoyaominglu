import { CommandBus } from '@nestjs/cqrs';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryCommand } from './cqrs/commands/impl/create-category.command';
import { UpdateCategoryCommand } from './cqrs/commands/impl/update-category.command';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './models/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly commandBus: CommandBus
  ) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.commandBus.execute<CreateCategoryCommand, Category>(
      new CreateCategoryCommand(createCategoryInput)
    );
  }

  @Query(() => [Category], { name: 'category' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    return this.commandBus.execute(
      new UpdateCategoryCommand(updateCategoryInput)
    );
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
