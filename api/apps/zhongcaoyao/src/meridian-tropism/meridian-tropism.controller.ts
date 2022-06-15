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
import { MeridianTropismService } from './meridian-tropism.service';
import { CreateMeridianTropismDto } from './dto/create-meridian-tropism.dto';
import { UpdateMeridianTropismDto } from './dto/update-meridian-tropism.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('meridian-tropism')
export class MeridianTropismController {
  constructor(
    private readonly meridianTropismService: MeridianTropismService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMeridianTropismDto: CreateMeridianTropismDto) {
    return this.meridianTropismService.create(createMeridianTropismDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.meridianTropismService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meridianTropismService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeridianTropismDto: UpdateMeridianTropismDto,
  ) {
    return this.meridianTropismService.update(+id, updateMeridianTropismDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meridianTropismService.remove(+id);
  }
}
