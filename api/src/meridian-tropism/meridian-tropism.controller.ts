import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeridianTropismService } from './meridian-tropism.service';
import { CreateMeridianTropismDto } from './dto/create-meridian-tropism.dto';
import { UpdateMeridianTropismDto } from './dto/update-meridian-tropism.dto';

@Controller('meridian-tropism')
export class MeridianTropismController {
  constructor(private readonly meridianTropismService: MeridianTropismService) {}

  @Post()
  create(@Body() createMeridianTropismDto: CreateMeridianTropismDto) {
    return this.meridianTropismService.create(createMeridianTropismDto);
  }

  @Get()
  findAll() {
    return this.meridianTropismService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meridianTropismService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeridianTropismDto: UpdateMeridianTropismDto) {
    return this.meridianTropismService.update(+id, updateMeridianTropismDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meridianTropismService.remove(+id);
  }
}
