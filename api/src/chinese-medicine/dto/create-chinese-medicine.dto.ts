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

  @IsInt()
  natureIds: number[];

  @IsInt()
  tasteIds: number[];

  @IsInt()
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
