import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  //OWNER FIELD
  @Field(() => Int)
  @Column()
  creatorId!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  rated!: string;

  @Field()
  @Column()
  synopsis!: string;

  @Field()
  @Column()
  score!: string;

  @Field()
  @Column()
  image_url!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
