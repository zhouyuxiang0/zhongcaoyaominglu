import { IsInt } from 'class-validator';

export class FindNameByCategoryDto {
  @IsInt()
  categoryId: number;
}
