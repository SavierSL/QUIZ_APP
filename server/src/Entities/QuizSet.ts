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
import { Quiz } from "./Quiz";

@ObjectType()
@Entity()
export class QuizSet extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @Column()
  title!: string;

  @Field(() => [Quiz], { nullable: true })
  @OneToMany(() => Quiz, (quiz) => quiz.quizSet)
  quizzes: Quiz[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
