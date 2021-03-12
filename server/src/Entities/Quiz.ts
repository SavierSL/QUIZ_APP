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

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  quizCode!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @Column()
  itemNumber!: number;

  @Field()
  @Column()
  quizSetId!: number;

  //OWNER FIELD
  @Field(() => QuizSet, { nullable: true })
  @ManyToOne(() => QuizSet, (quizSet) => quizSet.quizzes)
  quizSet!: QuizSet;

  @Field()
  @Column()
  question!: string;

  @Field(() => [MultipleChoices], { nullable: true })
  @OneToMany(() => MultipleChoices, (multipleChoices) => multipleChoices.quiz)
  multipleChoices: MultipleChoices[];

  @Field()
  @Column()
  answer!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
