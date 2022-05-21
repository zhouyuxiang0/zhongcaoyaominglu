import { Injectable } from '@nestjs/common';
import { CreateMeridianTropismDto } from './dto/create-meridian-tropism.dto';
import { UpdateMeridianTropismDto } from './dto/update-meridian-tropism.dto';

@Injectable()
export class MeridianTropismService {
  create(createMeridianTropismDto: CreateMeridianTropismDto) {
    return 'This action adds a new meridianTropism';
  }

  findAll() {
    return `This action returns all meridianTropism`;
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
