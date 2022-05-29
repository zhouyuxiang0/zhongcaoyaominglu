import { IsString } from 'class-validator';
export class CreateMeridianTropismDto {
  @IsString()
  name: string;
}
