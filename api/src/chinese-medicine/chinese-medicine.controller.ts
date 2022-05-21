import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChineseMedicineService } from './chinese-medicine.service';
import { CreateChineseMedicineDto } from './dto/create-chinese-medicine.dto';
import { UpdateChineseMedicineDto } from './dto/update-chinese-medicine.dto';

@Controller('chinese-medicine')
export class ChineseMedicineController {
  constructor(private readonly chineseMedicineService: ChineseMedicineService) {}

  @Post()
  create(@Body() createChineseMedicineDto: CreateChineseMedicineDto) {
    return this.chineseMedicineService.create(createChineseMedicineDto);
  }

  @Get()
  findAll() {
    return this.chineseMedicineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chineseMedicineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChineseMedicineDto: UpdateChineseMedicineDto) {
    return this.chineseMedicineService.update(+id, updateChineseMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chineseMedicineService.remove(+id);
  }
}
