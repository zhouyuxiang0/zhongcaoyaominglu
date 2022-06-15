import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryRepo: Repository<Category>;
  async create(createCategoryDto: CreateCategoryDto) {
    const { id, name, parentId } = createCategoryDto;
    const category = new Category();
    category.id = id;
    category.name = name;
    if (parentId) {
      const parent = await this.categoryRepo.findOneBy({ id: parentId });
      category.parent = parent;
    }
    const data = await category.save();
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async findAll() {
    const categories = await this.categoryRepo.manager
      .getTreeRepository(Category)
      .findTrees({
        relations: ['parent'],
      });
    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }

  async findAllParent() {
    const categories = await this.categoryRepo.manager
      .getTreeRepository(Category)
      .findRoots();
    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }

  async findChildrenByParentId(parentId: number) {
    const categoryTreeRepo =
      this.categoryRepo.manager.getTreeRepository(Category);
    const parent = await categoryTreeRepo.findOneBy({ id: parentId });
    const [_, ...categories] = await categoryTreeRepo.findDescendants(parent);
    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException();
    category.name = updateCategoryDto.name;
    const parent = new Category();
    parent.id = updateCategoryDto.parentId;
    category.parent = parent;
    await category.save();
    return {
      statusCode: HttpStatus.OK,
      data: category,
    };
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    await category.remove();
    return {
      statusCode: HttpStatus.OK,
      data: category,
    };
  }
}
