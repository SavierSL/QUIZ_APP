import { Student } from "../Entities/Student";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2, { hash } from "argon2";
import { MyContext } from "../types";
import { Answer } from "../Entities/Answer";
import { AnswerSet } from "../Entities/AnswerSet";
import { Teacher } from "../Entities/Teacher";

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
  user?: Student;
}
@ObjectType()
export class ResponseFieldT {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Teacher, { nullable: true })
  user?: Teacher;
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
  @Query(() => Student || Teacher, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    const user = await Student.findOne({ id: req.session.userId });
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  @Query(() => Teacher, { nullable: true })
  async meTeacher(@Ctx() { req }: MyContext) {
    const user = await Teacher.findOne({ id: req.session.teacherId });
    if (user) {
      return user;
    } else {
      return null;
    }
  }
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
    const user = await Student.create({
      email,
      password: hashedPass,
    }).save();
    req.session.userId = user.id;
    console.log(`session ID register ${req.session.userId}`);
    return {
      user,
    };
  }

  @Mutation(() => ResponseFieldT) //
  async registerTeacher(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<ResponseFieldT> {
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
    const user = await Teacher.create({
      email,
      password: hashedPass,
    }).save();
    req.session.teacherId = user.id;
    console.log(`session ID register ${req.session.userId}`);
    return {
      user,
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
    const user = await Student.findOne({ email });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "Cannot find email",
          },
        ],
      };
    }
    const isValid = await argon2.verify(user.password, password);
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
    req.session.userId = user.id;
    req.session.teacherId = -1;
    return {
      user,
    };
  }
  @Mutation(() => ResponseFieldT) //
  async logInTeacher(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<ResponseFieldT> {
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
    const user = await Teacher.findOne({ email });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "Cannot find email",
          },
        ],
      };
    }
    const isValid = await argon2.verify(user.password, password);
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
    req.session.userId = -1;
    req.session.teacherId = user.id;
    return {
      user,
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
  @Query(() => Student)
  async getStudentv2(@Arg("studentId", () => Int) studentId: number) {
    const student = await Student.findOne({ id: studentId });
    return student;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    //if there is an error in req.session.destroy() it will return false
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie("cookieID");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
