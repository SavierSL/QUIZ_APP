import { Quiz } from "../Entities/Quiz";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { QuizSet } from "../Entities/QuizSet";
import { getConnection, LessThan } from "typeorm";
import { MyContext } from "../types";
import crypto from "crypto";
import { AnswerSet } from "src/Entities/AnswerSet";
const set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generate(length: number) {
  const bytes = crypto.randomBytes(length);
  const chars = [];

  for (let i = 0; i < bytes.length; i++) {
    chars.push(set[bytes[i] % set.length]);
  }

  return chars.join(""); //
}

@Resolver()
export class QuizResolver {
  @Query(() => Quiz, { nullable: true })
  async getQuiz(@Arg("id", () => Int) id: number) {
    const quiz = await Quiz.findOne(
      { id: id },
      { relations: ["multipleChoices", "quizSet"] }
    );
    return quiz;
  }
  @Mutation(() => QuizSet, { nullable: true })
  async getQuizSet(
    @Arg("quizSetCode") quizSetCode: string,
    @Ctx() { req }: MyContext
  ) {
    console.log(`quiz set${req.session.userId}`);
    const quiz = await QuizSet.findOne(
      { quizSetCode: quizSetCode },
      { relations: ["quizzes", "quizzes.multipleChoices"] }
    );
    // const quiz = await getConnection().query(
    //   `
    // select qs.id = $1,

    // json_build_object(
    // 'id', q.id,
    // 'itemNumber',q."itemNumber",
    // 'setId', q."setId",
    // 'creatorId', q."creatorId",
    // 'answer',q.answer,
    // 'question',q.question
    // ) as quizzes

    // from quiz_set qs

    // inner join public.quiz q on q."setId" = qs.id
    // `,
    //   [id]
    // );
    return quiz;
  }
  @Mutation(() => QuizSet)
  async createQuizSet(
    @Arg("title") title: string,
    @Arg("subject") subject: string,
    @Arg("creatorId") creatorId: number
  ) {
    const quizSetCode = generate(6);
    const quizSet = await QuizSet.create({
      subject,
      title,
      creatorId,
      quizSetCode,
    }).save();
    return quizSet;
  }

  @Mutation(() => Quiz)
  async makeQuiz(
    @Arg("question") question: string,
    @Arg("itemNumber") itemNumber: number,
    @Arg("answer") answer: string,
    @Arg("quizSetId") quizSetId: number,
    @Arg("creatorId") creatorId: number
  ) {
    const quizCode = generate(6);
    const makeQuiz = await Quiz.create({
      question,
      answer,
      quizSetId,
      itemNumber,
      creatorId,
      quizCode,
    }).save();
    const answerSet1 = await QuizSet.findOne({ id: quizSetId });
    await QuizSet.update(
      { id: quizSetId },
      { totalItems: answerSet1?.totalItems ? answerSet1?.totalItems + 1 : 1 }
    );

    return makeQuiz;
  }
}
