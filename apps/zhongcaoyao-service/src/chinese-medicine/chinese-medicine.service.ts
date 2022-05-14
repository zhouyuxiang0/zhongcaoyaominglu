import { Injectable } from '@nestjs/common';
import { CreateChineseMedicineInput } from './dto/create-chinese-medicine.input';
import { UpdateChineseMedicineInput } from './dto/update-chinese-medicine.input';

@Injectable()
export class ChineseMedicineService {
  create(createChineseMedicineInput: CreateChineseMedicineInput) {
    return 'This action adds a new chineseMedicine';
  }

  findAll() {
    return `This action returns all chineseMedicine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chineseMedicine`;
  }

  update(id: number, updateChineseMedicineInput: UpdateChineseMedicineInput) {
    return `This action updates a #${id} chineseMedicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} chineseMedicine`;
  }
}
