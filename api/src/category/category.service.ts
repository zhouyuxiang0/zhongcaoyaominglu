import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryRepo: Repository<Category>;
  async create(createCategoryInput: CreateCategoryInput) {
    const category = await this.categoryRepo.findOne({
      where: {
        name: createCategoryInput.name,
      },
    });
    if (category) return category;
    const newCategory = new Category();
    newCategory.name = createCategoryInput.name;
    return await newCategory.save();
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async find(category: FindOptionsWhere<Category>) {
    return await this.categoryRepo.findOne({ where: category });
  }

  async findOne(id: number) {
    return await this.categoryRepo.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new InternalServerErrorException('更新失败');
    category.name = updateCategoryInput.name;
    return await this.categoryRepo.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
