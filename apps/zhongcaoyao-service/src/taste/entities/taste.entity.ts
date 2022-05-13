import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Taste {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
