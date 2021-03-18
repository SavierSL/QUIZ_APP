import { Answer } from "../Entities/Answer";
import { Quiz } from "../Entities/Quiz";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { AnswerSet } from "../Entities/AnswerSet";
import { QuizSet } from "../Entities/QuizSet";
import { MyContext } from "../types";
import { query } from "express";

@Resolver()
export class AnswerResolver extends BaseEntity {
  @Mutation(() => Answer)
  async answer(
    @Arg("quizSetId", () => Int) quizSetId: number,
    @Arg("itemNumber", () => Int) itemNumber: number,
    @Arg("quizId", () => Int) quizId: number,
    @Arg("answer") answer: string,
    @Ctx() { req }: MyContext
  ) {
    const question = await Quiz.findOne({ id: quizId });
    let isCorrect: boolean = false;
    if (question?.answer === answer) {
      isCorrect = true;
    } //
    const getAnswerSet = await AnswerSet.findOne(
      { quizSetId, studentId: req.session.userId },
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
    // let score: number;
    // if (typeof getAnswerSet?.score !== "undefined") {
    //   score = isCorrect ? getAnswerSet?.score + 1 : getAnswerSet?.score;
    // } else {
    //   score = getAnswerSet!.score;
    // }

    return createAnswer;
  }

  @Mutation(() => AnswerSet, { nullable: true })
  async createAnswerSet(
    @Arg("quizSetId", () => Int) quizSetId: number,
    @Ctx() { req }: MyContext
  ) {
    console.log(`session ID ${req.session.userId}`);
    const quizSet = await QuizSet.findOne({ id: quizSetId });
    const getAnswerSet = await AnswerSet.create({
      quizSetId,
      studentId: req.session.userId,
      title: quizSet?.title,
      totalItems: quizSet?.totalItems,
      subject: quizSet?.subject,
    }).save();
    return getAnswerSet;
  }

  @Query(() => [AnswerSet], { nullable: true })
  async getAnswerSet(@Arg("studentId", () => Int) studentId: number) {
    const getAnswerSet = await AnswerSet.find({
      where: { studentId },
      relations: ["answers"],
    });
    return getAnswerSet;
  }
  @Query(() => [AnswerSet])
  async getAnswerSetTeacher(@Arg("quizSetId", () => Int) quizSetId: number) {
    const getAnswerSets = await AnswerSet.find({
      relations: ["answers", "student"],
      where: {
        quizSetId: quizSetId,
      },
    });
    return getAnswerSets;
  }
  @Query(() => Int, { nullable: true })
  async getAnswerSetScore(@Arg("id", () => Int) id: number) {
    const getAnswerSet = await AnswerSet.findOne(
      { id },
      { relations: ["answers"] }
    );

    const score = getAnswerSet?.answers.reduce((score, answer) => {
      answer ? score++ : score;
      return score;
    }, 0);
    return score;
  }
}
