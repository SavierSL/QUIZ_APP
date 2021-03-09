import { Quiz } from "../Entities/Quiz";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { QuizSet } from "../Entities/QuizSet";
import { getConnection } from "typeorm";
import { MyContext } from "../types";

@Resolver()
export class QuizResolver {
  @Query(() => Quiz, { nullable: true })
  async getQuiz(@Arg("id") id: number) {
    const quiz = await Quiz.findOne(
      { id: id },
      { relations: ["multipleChoices", "quizSet"] }
    );
    return quiz;
  }
  @Query(() => QuizSet, { nullable: true })
  async getQuizSet(@Arg("id") id: number, @Ctx() { req }: MyContext) {
    console.log(`quiz set${req.session.userId}`);
    const quiz = await QuizSet.findOne(
      { id: id },
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
    @Arg("creatorId") creatorId: number
  ) {
    const quizSet = await QuizSet.create({ title, creatorId }).save();
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
    const makeQuiz = await Quiz.create({
      question,
      answer,
      quizSetId,
      itemNumber,
      creatorId,
    }).save();
    return makeQuiz;
  }
}
