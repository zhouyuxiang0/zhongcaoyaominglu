import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginAdminOutput {
  @Field(() => String, { description: 'token' })
  token: string;
}
