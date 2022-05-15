import { Injectable } from '@nestjs/common';
import { CreateMeridianTropismInput } from './dto/create-meridian-tropism.input';
import { UpdateMeridianTropismInput } from './dto/update-meridian-tropism.input';

@Injectable()
export class MeridianTropismService {
  create(createMeridianTropismInput: CreateMeridianTropismInput) {
    return 'This action adds a new meridianTropism';
  }

  findAll() {
    return `This action returns all meridianTropism`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meridianTropism`;
  }

  update(id: number, updateMeridianTropismInput: UpdateMeridianTropismInput) {
    return `This action updates a #${id} meridianTropism`;
  }

  remove(id: number) {
    return `This action removes a #${id} meridianTropism`;
  }
}
