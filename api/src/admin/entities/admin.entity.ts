import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('admin')
export class Admin extends CommonEntity {
  @Field(() => String, { description: '用户名' })
  @Column()
  username: string;

  @Column()
  password: string;
}
