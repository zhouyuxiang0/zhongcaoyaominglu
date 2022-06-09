import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateChineseMedicineDto {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  alias: Alias[];

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
  passages: UpdateChineseMedicinePassageDto[];
}

class Alias {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;
}

class UpdateChineseMedicinePassageDto {
  @IsInt()
  @IsOptional()
  id?: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
}
