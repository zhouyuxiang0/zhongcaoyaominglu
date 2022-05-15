import { CreateNatureInput } from './create-nature.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNatureInput extends PartialType(CreateNatureInput) {
  @Field(() => Int)
  id: number;
}
