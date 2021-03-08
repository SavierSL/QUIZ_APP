import { Quiz } from "../Entities/Quiz";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";
import { MultipleChoices } from "../Entities/MultipleChoices";

@Resolver()
export class MultippleChoiceResolver {
  @Mutation(() => MultipleChoices)
  async createMultipleChoice(
    @Arg("letterItem") letterItem: string,
    @Arg("letterContent") letterContent: string,
    @Arg("quizId")
    quizId: number
  ): Promise<MultipleChoices> {
    const createMultipleChoice = await MultipleChoices.create({
      letterItem,
      quizId,
      letterContent,
    }).save();

    return createMultipleChoice;
  }
}
