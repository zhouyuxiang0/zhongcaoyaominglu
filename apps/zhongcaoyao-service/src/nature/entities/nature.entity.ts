import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Nature {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
