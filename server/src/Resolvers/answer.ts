import { Answer } from "../Entities/Answer";
import { Quiz } from "../Entities/Quiz";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";

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
    }
    const createAnswer = await Answer.create({
      quizSetId,
      quizId,
      isCorrect,
      studentId,
      itemNumber,
      question: question?.question,
      answer,
    }).save();
    return createAnswer;
  }
}
