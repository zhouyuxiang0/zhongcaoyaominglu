import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeridianTropismDto } from './dto/create-meridian-tropism.dto';
import { UpdateMeridianTropismDto } from './dto/update-meridian-tropism.dto';
import { MeridianTropism } from './entities/meridian-tropism.entity';

@Injectable()
export class MeridianTropismService {
  @InjectRepository(MeridianTropism)
  private readonly meridianTropismRepo: Repository<MeridianTropism>;
  async create(createMeridianTropismDto: CreateMeridianTropismDto) {
    const meridianTropism = new MeridianTropism();
    meridianTropism.name = createMeridianTropismDto.name;
    await meridianTropism.save();
    return {
      statusCode: HttpStatus.OK,
      data: meridianTropism,
    };
  }

  async findAll() {
    const meridianTropism = await this.meridianTropismRepo.find();
    return {
      statusCode: HttpStatus.OK,
      data: meridianTropism,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} meridianTropism`;
  }

  update(id: number, updateMeridianTropismDto: UpdateMeridianTropismDto) {
    return `This action updates a #${id} meridianTropism`;
  }

  remove(id: number) {
    return `This action removes a #${id} meridianTropism`;
  }
}
