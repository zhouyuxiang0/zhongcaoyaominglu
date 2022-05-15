import { CreateMeridianTropismInput } from './create-meridian-tropism.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeridianTropismInput extends PartialType(
  CreateMeridianTropismInput
) {
  @Field(() => Int)
  id: number;
}
