import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAdminInput {
  @Field(() => String, { description: '用户名' })
  username: string;

  @Field(() => String, { description: '密码' })
  password: string;
}
