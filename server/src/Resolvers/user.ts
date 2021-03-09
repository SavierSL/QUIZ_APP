import { Student } from "../Entities/Student";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "../types";

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
}
