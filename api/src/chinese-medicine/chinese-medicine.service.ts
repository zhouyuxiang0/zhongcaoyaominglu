import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/common/entities/image.entity';
import { Passage } from 'src/common/entities/passage.entity';
import { MeridianTropism } from 'src/meridian-tropism/entities/meridian-tropism.entity';
import { Nature } from 'src/nature/entities/nature.entity';
import { Taste } from 'src/taste/entities/taste.entity';
import { Repository } from 'typeorm';
import { CreateChineseMedicineDto } from './dto/create-chinese-medicine.dto';
import { UpdateChineseMedicineDto } from './dto/update-chinese-medicine.dto';
import { ChineseMedicineAlias } from './entities/chinese-medicine-alias.entity';
import { ChineseMedicine } from './entities/chinese-medicine.entity';

@Injectable()
export class ChineseMedicineService {
  @InjectRepository(ChineseMedicine)
  private readonly chineseMedicineRepo: Repository<ChineseMedicine>;
  async create(createChineseMedicineDto: CreateChineseMedicineDto) {
    const chineseMedicine = new ChineseMedicine();
    chineseMedicine.name = createChineseMedicineDto.name;
    chineseMedicine.alias = createChineseMedicineDto.alias.map((v) => {
      const alias = new ChineseMedicineAlias();
      alias.name = v;
      return alias;
    });
    const category = new Category();
    category.id = createChineseMedicineDto.categoryId;
    chineseMedicine.category = category;
    chineseMedicine.images = createChineseMedicineDto.images.map((img) => {
      const image = new Image();
      image.url = img;
      return image;
    });
    chineseMedicine.nature = createChineseMedicineDto.natureIds.map(
      (natureId) => {
        const nature = new Nature();
        nature.id = natureId;
        return nature;
      },
    );
    chineseMedicine.taste = createChineseMedicineDto.tasteIds.map((tasteId) => {
      const taste = new Taste();
      taste.id = tasteId;
      return taste;
    });
    chineseMedicine.meridianTropism =
      createChineseMedicineDto.meridianTropismIds.map((meridianTropismId) => {
        const meridianTropism = new MeridianTropism();
        meridianTropism.id = meridianTropismId;
        return meridianTropism;
      });
    chineseMedicine.passage = createChineseMedicineDto.passages.map(
      (passage) => {
        const newPassage = new Passage();
        newPassage.title = passage.title;
        newPassage.content = passage.content;
        return newPassage;
      },
    );
    await chineseMedicine.save();
    return {
      statusCode: HttpStatus.OK,
      data: chineseMedicine,
    };
  }

  async findAll() {
    const [data, count] = await this.chineseMedicineRepo.findAndCount({
      relations: [
        'images',
        'alias',
        'passage',
        'category',
        'nature',
        'taste',
        'meridianTropism',
      ],
    });
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} chineseMedicine`;
  }

  async update(id: number, updateChineseMedicineDto: UpdateChineseMedicineDto) {
    const chineseMedicine = await this.chineseMedicineRepo.findOne({
      where: { id },
      relations: [
        'images',
        'alias',
        'passage',
        'category',
        'nature',
        'taste',
        'meridianTropism',
      ],
    });
    if (!chineseMedicine) throw new NotFoundException();
    chineseMedicine;
    return `This action updates a #${id} chineseMedicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} chineseMedicine`;
  }
}
