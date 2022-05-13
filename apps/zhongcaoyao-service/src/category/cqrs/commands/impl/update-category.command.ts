import { UpdateCategoryInput } from '../../../dto/update-category.input';

export class UpdateCategoryCommand {
  constructor(public readonly updateCategoryInput: UpdateCategoryInput) {}
}
