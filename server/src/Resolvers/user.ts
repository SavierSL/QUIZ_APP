import { Student } from "../Entities/Student";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2, { hash } from "argon2";
import { MyContext } from "../types";
import { Answer } from "../Entities/Answer";
import { AnswerSet } from "../Entities/AnswerSet";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class ResponseField {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Student, { nullable: true })
  student?: Student;
}

@ObjectType()
export class StudentData {
  @Field()
  student?: Student;

  @Field(() => [AnswerSet])
  answerSets: AnswerSet[];
}

@Resolver()
export class UserResolver {
  @Mutation(() => ResponseField) //
  async registerStudent(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<ResponseField> {
    if (!email.includes("@")) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email",
          },
        ],
      };
    }
    if (password.length < 6) {
      return {
        errors: [
          {
            field: "password",
            message: "password must be 6 or more chars",
          },
        ],
      };
    }
    const hashedPass = await argon2.hash(password);
    const student = await Student.create({
      email,
      password: hashedPass,
    }).save();
    req.session.userId = student.id;
    console.log(`session ID register ${req.session.userId}`);
    return {
      student,
    };
  }
  @Mutation(() => ResponseField) //
  async logInStudent(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<ResponseField> {
    if (!email.includes("@")) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email",
          },
        ],
      };
    }
    if (password.length < 6) {
      return {
        errors: [
          {
            field: "password",
            message: "password must be 6 or more chars",
          },
        ],
      };
    }
    const student = await Student.findOne({ email });
    if (!student) {
      return {
        errors: [
          {
            field: "email",
            message: "Cannot find email",
          },
        ],
      };
    }
    const isValid = await argon2.verify(student.password, password);
    if (!isValid) {
      return {
        errors: [
          {
            field: "password",
            message: "wrong password",
          },
        ],
      };
    }
    req.session.userId = student.id;
    return {
      student,
    };
  }
  @Query(() => StudentData, { nullable: true })
  async getStudent(@Ctx() { req }: MyContext): Promise<StudentData | null> {
    const student = await Student.findOne(
      { id: req.session.userId },
      {
        relations: ["answerSets"],
      }
    );
    if (!student) {
      return null;
    }
    return {
      student,
      answerSets: student.answerSets,
    };
  }
}
