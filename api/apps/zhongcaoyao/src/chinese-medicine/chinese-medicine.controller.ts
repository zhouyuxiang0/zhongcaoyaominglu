import {
  Body,
  CacheKey,
  CacheStore,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChineseMedicineService } from './chinese-medicine.service';
import { CreateChineseMedicineDto } from './dto/create-chinese-medicine.dto';
import { FindNameByCategoryDto } from './dto/find-name-by-category.dto';
import { SearchChineseMedicineDto } from './dto/search-chinese-medicine.dto';
import { UpdateChineseMedicineDto } from './dto/update-chinese-medicine.dto';

@Controller('chinese-medicine')
export class ChineseMedicineController {
  constructor(
    private readonly chineseMedicineService: ChineseMedicineService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createChineseMedicineDto: CreateChineseMedicineDto) {
    return this.chineseMedicineService.create(createChineseMedicineDto);
  }

  @Get()
  findAll(@Query() searchChineseMedicineDto: SearchChineseMedicineDto) {
    return this.chineseMedicineService.findAll(searchChineseMedicineDto);
  }

  @Get('search-data')
  @CacheTTL(12 * 60 * 60)
  async getSearchData() {
    return this.chineseMedicineService.getSearchData();
  }

  @Get('by-category')
  findNameByCategory(@Query() findNameByCategoryDto: FindNameByCategoryDto) {
    return this.chineseMedicineService.findNameByCategory(
      findNameByCategoryDto,
    );
  }

  @Get('recommend')
  getRecommend() {
    return this.chineseMedicineService.getRecommend();
  }

  @Get('video/:id')
  video(@Param('id') id: number) {
    return this.chineseMedicineService.video(id);
  }

  @Get('random-placeholder')
  getRandomPlaceholder() {
    return this.chineseMedicineService.getRandomPlaceholder();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chineseMedicineService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateChineseMedicineDto: UpdateChineseMedicineDto,
  ) {
    return this.chineseMedicineService.update(+id, updateChineseMedicineDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.chineseMedicineService.remove(+id);
  }
}
