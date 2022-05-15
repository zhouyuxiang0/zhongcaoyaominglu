import { Injectable } from '@nestjs/common';
import { CreateNatureInput } from './dto/create-nature.input';
import { UpdateNatureInput } from './dto/update-nature.input';

@Injectable()
export class NatureService {
  create(createNatureInput: CreateNatureInput) {
    return 'This action adds a new nature';
  }

  findAll() {
    return `This action returns all nature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nature`;
  }

  update(id: number, updateNatureInput: UpdateNatureInput) {
    return `This action updates a #${id} nature`;
  }

  remove(id: number) {
    return `This action removes a #${id} nature`;
  }
}
