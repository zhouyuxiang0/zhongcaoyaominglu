import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { Taste } from './entities/taste.entity';

@Injectable()
export class TasteService {
  @InjectRepository(Taste) private readonly tasteRepo: Repository<Taste>;
  async create(createTasteDto: CreateTasteDto) {
    const taste = new Taste();
    taste.name = createTasteDto.name;
    await taste.save();
    return {
      statusCode: HttpStatus.OK,
      data: taste,
    };
  }

  async findAll() {
    const tastes = await this.tasteRepo.find();
    return {
      statusCode: HttpStatus.OK,
      data: tastes,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} taste`;
  }

  update(id: number, updateTasteDto: UpdateTasteDto) {
    return `This action updates a #${id} taste`;
  }

  remove(id: number) {
    return `This action removes a #${id} taste`;
  }
}
