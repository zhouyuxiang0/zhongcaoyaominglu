import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NatureService } from './nature.service';
import { CreateNatureDto } from './dto/create-nature.dto';
import { UpdateNatureDto } from './dto/update-nature.dto';

@Controller('nature')
export class NatureController {
  constructor(private readonly natureService: NatureService) {}

  @Post()
  create(@Body() createNatureDto: CreateNatureDto) {
    return this.natureService.create(createNatureDto);
  }

  @Get()
  findAll() {
    return this.natureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNatureDto: UpdateNatureDto) {
    return this.natureService.update(+id, updateNatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.natureService.remove(+id);
  }
}
