import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { Image } from '../common/entities/image.entity';
import { Passage } from '../common/entities/passage.entity';
import { MeridianTropism } from '../meridian-tropism/entities/meridian-tropism.entity';
import { Nature } from '../nature/entities/nature.entity';
import { Taste } from '../taste/entities/taste.entity';
import { CreateChineseMedicineDto } from './dto/create-chinese-medicine.dto';
import { SearchChineseMedicineDto } from './dto/search-chinese-medicine.dto';
import { UpdateChineseMedicineDto } from './dto/update-chinese-medicine.dto';
import { ChineseMedicineAlias } from './entities/chinese-medicine-alias.entity';
import { ChineseMedicine } from './entities/chinese-medicine.entity';

@Injectable()
export class ChineseMedicineService {
  private readonly logger = new Logger(ChineseMedicineService.name);
  @InjectRepository(ChineseMedicineAlias)
  private readonly chineseMedicineAliasRepo: Repository<ChineseMedicineAlias>;
  @InjectRepository(Image) private readonly imageRepo: Repository<Image>;
  @Inject() private readonly categoryService: CategoryService;
  private recommendList: ChineseMedicine[] = [];
  private recommend: ChineseMedicine = null;
  constructor(
    @InjectRepository(ChineseMedicine)
    private readonly chineseMedicineRepo: Repository<ChineseMedicine>,
  ) {
    this.initRecommendList().then(() => {
      this.recommendProcess();
    });
  }
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

  async findAll(searchChineseMedicineDto: SearchChineseMedicineDto) {
    const { page = 1, size = 10 } = searchChineseMedicineDto;
    const [list, total] = await this.chineseMedicineRepo.findAndCount({
      relations: [
        'images',
        'alias',
        'passage',
        'category',
        'category.parent',
        'nature',
        'taste',
        'meridianTropism',
      ],
      where: {
        category: searchChineseMedicineDto.categoryId
          ? { id: searchChineseMedicineDto.categoryId }
          : void 0,
      },
      skip: (page - 1) * size,
      take: size,
      order: {
        id: 'desc',
      },
    });
    return {
      statusCode: HttpStatus.OK,
      data: {
        list,
        total,
      },
    };
  }

  async getRecommend() {
    if (this.recommend) return this.recommend;
    await this.initRecommendList();
    await this.recommendProcess();
    return this.recommend;
  }

  async findOne(id: number) {
    const data = await this.chineseMedicineRepo.findOne({
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
    return {
      statusCode: HttpStatus.OK,
      data,
    };
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
    if (updateChineseMedicineDto.alias.length > 0) {
      chineseMedicine.alias = updateChineseMedicineDto.alias.map((v) => {
        const alias = new ChineseMedicineAlias();
        if (v.id) alias.id = v.id;
        alias.name = v.name;
        return alias;
      });
    }
    if (updateChineseMedicineDto.categoryId) {
      const category = new Category();
      category.id = updateChineseMedicineDto.categoryId;
      chineseMedicine.category = category;
    }
    if (updateChineseMedicineDto.images) {
      chineseMedicine.images = updateChineseMedicineDto.images.map((v) => {
        const img = new Image();
        img.url = v;
        return img;
      });
    }
    if (updateChineseMedicineDto.meridianTropismIds) {
      chineseMedicine.meridianTropism =
        updateChineseMedicineDto.meridianTropismIds.map((v) => {
          const meridianTropism = new MeridianTropism();
          meridianTropism.id = v;
          return meridianTropism;
        });
    }
    if (updateChineseMedicineDto.name) {
      chineseMedicine.name = updateChineseMedicineDto.name;
    }
    if (updateChineseMedicineDto.natureIds) {
      chineseMedicine.nature = updateChineseMedicineDto.natureIds.map((v) => {
        const nature = new Nature();
        nature.id = v;
        return nature;
      });
    }
    if (updateChineseMedicineDto.passages) {
      chineseMedicine.passage = updateChineseMedicineDto.passages.map((v) => {
        const passage = new Passage();
        if (v.id) passage.id = v.id;
        passage.title = v.title;
        passage.content = v.content;
        return passage;
      });
    }
    if (updateChineseMedicineDto.tasteIds) {
      chineseMedicine.taste = updateChineseMedicineDto.tasteIds.map((v) => {
        const taste = new Taste();
        taste.id = v;
        return taste;
      });
      const savedChineseMedicine = await chineseMedicine.save();
      return {
        statusCode: HttpStatus.OK,
        data: savedChineseMedicine,
      };
    }
    return `This action updates a #${id} chineseMedicine`;
  }

  async remove(id: number) {
    const chineseMedicine = await this.chineseMedicineRepo.findOneBy({ id });
    const removed = await chineseMedicine.remove();
    return {
      statusCode: HttpStatus.OK,
      data: removed,
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async recommendProcess() {
    if (this.recommendList.length <= 0) await this.initRecommendList();
    this.recommend =
      this.recommendList[Math.floor(Math.random() * this.recommendList.length)];
    this.recommendList = this.recommendList.filter(
      (v) => v.id != this.recommend.id,
    );
    this.logger.log(`今日药材小知识：${JSON.stringify(this.recommend)}`);
  }

  async initRecommendList() {
    this.chineseMedicineRepo
      .find({
        select: ['id', 'name', 'images'],
        relations: ['images'],
      })
      .then((v) => {
        this.recommendList = v;
      });
  }
}
