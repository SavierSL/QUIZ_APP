import { Answer } from "../Entities/Answer";
import { Quiz } from "../Entities/Quiz";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { AnswerSet } from "../Entities/AnswerSet";
import { QuizSet } from "../Entities/QuizSet";

@Resolver()
export class AnswerResolver extends BaseEntity {
  @Mutation(() => Answer)
  async answer(
    @Arg("studentId") studentId: number,
    @Arg("quizSetId") quizSetId: number,
    @Arg("itemNumber") itemNumber: number,
    @Arg("quizId") quizId: number,
    @Arg("answer") answer: string
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
      quizSetId,
      quizId,
      isCorrect,
      studentId,
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
    @Arg("studentId") studentId: number
  ) {
    const quizSet = await QuizSet.findOne({ id: quizSetId });
    const getAnswerSet = await AnswerSet.create({
      quizSetId,
      studentId,
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
