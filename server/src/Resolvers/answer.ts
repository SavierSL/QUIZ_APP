import { Answer } from "../Entities/Answer";
import { Quiz } from "../Entities/Quiz";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { AnswerSet } from "../Entities/AnswerSet";
import { QuizSet } from "../Entities/QuizSet";
import { MyContext } from "../types";

@Resolver()
export class AnswerResolver extends BaseEntity {
  @Mutation(() => Answer)
  async answer(
    @Arg("quizSetId") quizSetId: number,
    @Arg("itemNumber") itemNumber: number,
    @Arg("quizId") quizId: number,
    @Arg("answer") answer: string,
    @Ctx() { req }: MyContext
  ) {
    const question = await Quiz.findOne({ id: quizId });
    let isCorrect: any = false;
    if (question?.answer === answer) {
      isCorrect = true;
    } //
    const getAnswerSet = await AnswerSet.findOne(
      { quizSetId },
      { relations: ["answers"] }
    );
    if (
      getAnswerSet?.answers[getAnswerSet?.answers?.length - 1]?.quizId ===
      quizId
    ) {
      return;
    }
    const createAnswer = await Answer.create({
      quizId,
      isCorrect,
      studentId: req.session.userId,
      itemNumber,
      question: question?.question,
      answer,
      answerSetId: question?.quizSetId,
    }).save();
    return createAnswer;
  }

  @Mutation(() => AnswerSet, { nullable: true })
  async createAnswerSet(
    @Arg("quizSetId") quizSetId: number,
    @Ctx() { req }: MyContext
  ) {
    console.log(`session ID ${req.session.userId}`);
    const quizSet = await QuizSet.findOne({ id: quizSetId });
    const getAnswerSet = await AnswerSet.create({
      quizSetId,
      studentId: req.session.userId,
      title: quizSet?.title,
    }).save();
    return getAnswerSet;
  }

  @Query(() => AnswerSet, { nullable: true })
  async getAnswerSet(@Arg("quizSetId") quizSetId: number) {
    const getAnswerSet = await AnswerSet.findOne(
      {
        quizSetId,
      },
      { relations: ["answers"] }
    );
    return getAnswerSet;
  }
}
