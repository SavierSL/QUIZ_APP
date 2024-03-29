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

import { Answer } from "./Answer";
import { QuizSet } from "./QuizSet";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class AnswerSet extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  studentId!: number;

  @Field()
  @Column()
  quizSetId!: number;

  @Field()
  @Column()
  title!: string;

  @Field() //
  @Column()
  subject!: string;

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.answerSet)
  answers: Answer[];

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.answerSets)
  student!: Student;

  @Field(() => QuizSet, { nullable: true })
  @ManyToOne(() => QuizSet, (quizSet) => quizSet.answerSet)
  quizSet: QuizSet;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  totalItems: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
//
