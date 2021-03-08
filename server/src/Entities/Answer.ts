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
import { MultipleChoices } from "./MultipleChoices";
import { QuizSet } from "./QuizSet";
import { AnswerSet } from "./AnswerSet";

@ObjectType()
@Entity()
export class Answer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  studentId!: number;

  @Field()
  @Column()
  itemNumber!: number;

  @Field()
  @Column()
  quizSetId!: number;

  @Field()
  @Column()
  answerSetId!: number;

  @Field(() => Int)
  @Column()
  quizId!: number;

  @Field()
  @Column()
  question!: string;

  @Field()
  @Column()
  answer!: string;

  @Field()
  @Column()
  isCorrect!: boolean;

  @Field(() => AnswerSet, { nullable: true })
  @ManyToOne(() => AnswerSet, (answerSet) => answerSet.answers)
  answerSet!: AnswerSet;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
