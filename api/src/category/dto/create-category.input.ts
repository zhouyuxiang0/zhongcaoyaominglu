import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: '分类名称' })
  name: string;
}
