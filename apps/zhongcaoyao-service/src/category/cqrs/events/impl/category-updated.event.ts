import { Category } from '../../../models/category.entity';

export class CategoryUpdatedEvent {
  constructor(public readonly category: Category) {}
}
