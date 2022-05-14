import { CreateChineseMedicineInput } from './create-chinese-medicine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChineseMedicineInput extends PartialType(
  CreateChineseMedicineInput
) {
  @Field(() => Int)
  id: number;
}
