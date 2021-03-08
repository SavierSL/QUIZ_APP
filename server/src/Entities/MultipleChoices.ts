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
export class MultipleChoices extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  quizId!: number;

  @Field(() => Quiz)
  @ManyToOne(() => Quiz, (quiz) => quiz.multipleChoices)
  quiz!: Quiz;

  @Field()
  @Column()
  letterItem!: string;

  @Field()
  @Column()
  letterContent: string;

  //   //OWNER FIELD
  //   @Field(() => Int)
  //   @Column()
  //   creatorId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
