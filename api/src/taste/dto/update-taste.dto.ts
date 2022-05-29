import { PartialType } from '@nestjs/mapped-types';
import { CreateTasteDto } from './create-taste.dto';

export class UpdateTasteDto extends PartialType(CreateTasteDto) {
  id: number;
}
