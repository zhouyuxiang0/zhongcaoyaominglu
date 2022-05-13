import { CreateTasteInput } from './create-taste.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTasteInput extends PartialType(CreateTasteInput) {
  @Field(() => Int)
  id: number;
}
