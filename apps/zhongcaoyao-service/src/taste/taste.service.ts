import { Injectable } from '@nestjs/common';
import { CreateTasteInput } from './dto/create-taste.input';
import { UpdateTasteInput } from './dto/update-taste.input';

@Injectable()
export class TasteService {
  create(createTasteInput: CreateTasteInput) {
    return 'This action adds a new taste';
  }

  findAll() {
    return `This action returns all taste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taste`;
  }

  update(id: number, updateTasteInput: UpdateTasteInput) {
    return `This action updates a #${id} taste`;
  }

  remove(id: number) {
    return `This action removes a #${id} taste`;
  }
}
