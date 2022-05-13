import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMeridianTropismInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
