import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  parentId?: number;
}
