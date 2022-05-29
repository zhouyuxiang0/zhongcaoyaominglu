import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNatureDto } from './dto/create-nature.dto';
import { UpdateNatureDto } from './dto/update-nature.dto';
import { Nature } from './entities/nature.entity';

@Injectable()
export class NatureService {
  @InjectRepository(Nature) private readonly natureRepo: Repository<Nature>;
  async create(createNatureDto: CreateNatureDto) {
    const nature = new Nature();
    nature.name = createNatureDto.name;
    await nature.save();
    return {
      status: HttpStatus.OK,
      data: nature,
    };
  }

  async findAll() {
    const natures = await this.natureRepo.find();
    return {
      statusCode: HttpStatus.OK,
      data: natures,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} nature`;
  }

  update(id: number, updateNatureDto: UpdateNatureDto) {
    return `This action updates a #${id} nature`;
  }

  async remove(id: number) {
    const nature = await this.natureRepo.findOneBy({ id });
    await nature.remove();
    return {
      statusCode: HttpStatus.OK,
      data: nature,
    };
  }
}
