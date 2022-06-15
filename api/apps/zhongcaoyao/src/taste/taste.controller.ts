import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasteService } from './taste.service';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('taste')
export class TasteController {
  constructor(private readonly tasteService: TasteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTasteDto: CreateTasteDto) {
    return this.tasteService.create(createTasteDto);
  }

  @UseGuards(AuthGuard('jwt'))
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
