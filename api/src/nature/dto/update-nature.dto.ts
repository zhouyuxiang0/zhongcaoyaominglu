import { PartialType } from '@nestjs/mapped-types';
import { CreateNatureDto } from './create-nature.dto';

export class UpdateNatureDto extends PartialType(CreateNatureDto) {
  id: number;
}
