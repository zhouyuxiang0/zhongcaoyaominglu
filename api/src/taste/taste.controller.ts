import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasteService } from './taste.service';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';

@Controller('taste')
export class TasteController {
  constructor(private readonly tasteService: TasteService) {}

  @Post()
  create(@Body() createTasteDto: CreateTasteDto) {
    return this.tasteService.create(createTasteDto);
  }

  @Get()
  findAll() {
    return this.tasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTasteDto: UpdateTasteDto) {
    return this.tasteService.update(+id, updateTasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasteService.remove(+id);
  }
}
