import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AnswerSet } from "./AnswerSet";
import { QuizSet } from "./QuizSet";

@ObjectType()
@Entity()
export class Teacher extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field(() => [QuizSet], { nullable: true })
  @OneToMany(() => QuizSet, (quizSet) => quizSet.creator)
  quizSet!: QuizSet[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
