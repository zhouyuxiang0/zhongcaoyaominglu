import { Category } from '../../../models/category.entity';

export class CategoryCreatedEvent {
  constructor(public readonly category: Category) {}
}
