import { IsInt, IsString, ValidateNested } from 'class-validator';

export class CreateChineseMedicineDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  alias: string[];

  @IsString({ each: true })
  images: string[];

  @IsInt()
  categoryId: number;

  @IsInt({ each: true })
  natureIds: number[];

  @IsInt({ each: true })
  tasteIds: number[];

  @IsInt({ each: true })
  meridianTropismIds: number[];

  @ValidateNested({ each: true })
  passages: CreateChineseMedicinePassageDto[];
}

class CreateChineseMedicinePassageDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
}
