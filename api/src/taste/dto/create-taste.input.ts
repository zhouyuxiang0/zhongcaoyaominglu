import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTasteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
