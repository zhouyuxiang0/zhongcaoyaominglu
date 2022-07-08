import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchChineseMedicineDto {
  @IsInt()
  @IsOptional()
  page: number;
  @IsInt()
  @IsOptional()
  size: number;
  @IsInt()
  @IsOptional()
  categoryId: number;
  @IsString()
  @IsOptional()
  name: string;
}
