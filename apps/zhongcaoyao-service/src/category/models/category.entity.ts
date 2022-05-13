import { AggregateRoot } from '@nestjs/cqrs';
import {
  Directive,
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryCreatedEvent } from '../cqrs/events/impl/category-created.event';
import { CategoryUpdatedEvent } from '../cqrs/events/impl/category-updated.event';

@Directive(`@key(fields: "id")`)
@ObjectType()
@Entity('category')
export class Category extends AggregateRoot {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String, { description: '分类名称' })
  @Column()
  name: string;

  @Field(() => GraphQLISODateTime, { description: '创建时间' })
  @CreateDateColumn()
  public createTime: Date;

  @Field(() => GraphQLISODateTime, { description: '更新时间' })
  @UpdateDateColumn()
  public updateTime: Date;

  createCategory() {
    this.apply(new CategoryCreatedEvent(this));
  }

  updateCategory() {
    this.apply(new CategoryUpdatedEvent(this));
  }
}
