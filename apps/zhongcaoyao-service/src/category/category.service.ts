import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryRepo: Repository<Category>;
  async create(createCategoryInput: CreateCategoryInput) {
    const category = await this.categoryRepo.findOne({
      where: { name: createCategoryInput.name },
    });
    if (category) return category;
    const newCategory = new Category();
    newCategory.name = createCategoryInput.name;
    return await this.categoryRepo.save(newCategory);
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: number) {
    return await this.categoryRepo.findOne({ where: { id } });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
