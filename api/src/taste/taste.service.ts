import { Injectable } from '@nestjs/common';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';

@Injectable()
export class TasteService {
  create(createTasteDto: CreateTasteDto) {
    return 'This action adds a new taste';
  }

  findAll() {
    return `This action returns all taste`;
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
