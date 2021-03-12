import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Field, Float, Int, ObjectType } from "type-graphql";
import { Quiz } from "./Quiz";
import { AnswerSet } from "./AnswerSet";

@ObjectType()
@Entity()
export class QuizSet extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  quizSetCode!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @Column()
  title!: string;

  @Field(() => [Quiz], { nullable: true })
  @OneToMany(() => Quiz, (quiz) => quiz.quizSet)
  quizzes: Quiz[];

  @Field(() => AnswerSet, { nullable: true })
  @OneToOne(() => AnswerSet, (answerSet) => answerSet.quizSet)
  answerSet: AnswerSet;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
