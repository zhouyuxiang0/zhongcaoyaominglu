import { Injectable } from '@nestjs/common';
import { CreateNatureDto } from './dto/create-nature.dto';
import { UpdateNatureDto } from './dto/update-nature.dto';

@Injectable()
export class NatureService {
  create(createNatureDto: CreateNatureDto) {
    return 'This action adds a new nature';
  }

  findAll() {
    return `This action returns all nature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nature`;
  }

  update(id: number, updateNatureDto: UpdateNatureDto) {
    return `This action updates a #${id} nature`;
  }

  remove(id: number) {
    return `This action removes a #${id} nature`;
  }
}
