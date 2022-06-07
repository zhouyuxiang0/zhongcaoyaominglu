import { PartialType } from '@nestjs/mapped-types';
import { CreateChineseMedicineDto } from './create-chinese-medicine.dto';

export class UpdateChineseMedicineDto extends PartialType(
  CreateChineseMedicineDto,
) {}
