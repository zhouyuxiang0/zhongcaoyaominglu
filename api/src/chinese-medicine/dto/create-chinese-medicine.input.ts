import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChineseMedicineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
