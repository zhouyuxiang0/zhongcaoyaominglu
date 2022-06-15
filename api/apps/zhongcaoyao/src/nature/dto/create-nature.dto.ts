import { IsString } from 'class-validator';
export class CreateNatureDto {
  @IsString()
  name: string;
}
