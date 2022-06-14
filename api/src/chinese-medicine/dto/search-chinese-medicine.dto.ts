import { IsInt, IsOptional } from 'class-validator';

export class SearchChineseMedicineDto {
  @IsInt()
  @IsOptional()
  page: number;
  @IsInt()
  @IsOptional()
  size: number;
}
