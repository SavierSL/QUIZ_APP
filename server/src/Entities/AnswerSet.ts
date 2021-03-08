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

import { Answer } from "./Answer";

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

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.answerSet)
  answers: Answer[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
