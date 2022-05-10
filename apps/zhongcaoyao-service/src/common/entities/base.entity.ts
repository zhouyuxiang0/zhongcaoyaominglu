import { Field, GraphQLISODateTime, ID, InterfaceType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@InterfaceType()
export abstract class BaseEntity {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => GraphQLISODateTime, { description: '创建时间' })
  @CreateDateColumn()
  public createTime: Date;

  @Field(() => GraphQLISODateTime, { description: '更新时间' })
  @UpdateDateColumn()
  public updateTime: Date;
}
