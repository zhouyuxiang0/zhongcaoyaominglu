import { Injectable } from '@nestjs/common';
import { CreateChineseMedicineDto } from './dto/create-chinese-medicine.dto';
import { UpdateChineseMedicineDto } from './dto/update-chinese-medicine.dto';

@Injectable()
export class ChineseMedicineService {
  create(createChineseMedicineDto: CreateChineseMedicineDto) {
    return 'This action adds a new chineseMedicine';
  }

  findAll() {
    return `This action returns all chineseMedicine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chineseMedicine`;
  }

  update(id: number, updateChineseMedicineDto: UpdateChineseMedicineDto) {
    return `This action updates a #${id} chineseMedicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} chineseMedicine`;
  }
}
