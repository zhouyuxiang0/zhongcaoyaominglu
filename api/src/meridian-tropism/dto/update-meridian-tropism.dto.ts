import { PartialType } from '@nestjs/mapped-types';
import { CreateMeridianTropismDto } from './create-meridian-tropism.dto';

export class UpdateMeridianTropismDto extends PartialType(
  CreateMeridianTropismDto,
) {}
