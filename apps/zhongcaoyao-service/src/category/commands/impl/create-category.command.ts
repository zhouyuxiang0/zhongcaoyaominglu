import { CreateCategoryInput } from '../../dto/create-category.input';

export class CreateCategoryCommand {
  constructor(public readonly createCategoryInput: CreateCategoryInput) {}
}
