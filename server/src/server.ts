import "reflect-metadata"; //typeorm need this

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { MyContext } from "./types";
import { QuizResolver } from "./Resolvers/quiz";
import { MultippleChoiceResolver } from "./Resolvers/multipleChoice";
import { MultipleChoices } from "./Entities/MultipleChoices";
import { QuizSet } from "./Entities/QuizSet";
import { AnswerResolver } from "./Resolvers/answer";
import { Answer } from "./Entities/Answer";
import { AnswerSet } from "./Entities/AnswerSet";
import { Quiz } from "./Entities/Quiz";

//declare this for the session
declare module "express-session" {
  interface Session {
    userId: number; //
  }
}

const main = async () => {
  //typeorm first
  const connection = await createConnection({
    type: "postgres",
    database: "quiz",
    username: "postgres",
    password: "xxkaa548",
    logging: true,
    synchronize: true,
    entities: [Quiz, MultipleChoices, QuizSet, Answer, AnswerSet],
  });
  // await QuizSet.delete({});
  // await MultipleChoices.delete({});
  // await Quiz.delete({});
  // await Answer.delete({}); //
  // await AnswerSet.delete({});
  // app
  const app = express();

  // cookie
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "cid", //cookie name
      store: new RedisStore({
        client: redis,
        disableTouch: true, //true to keep the user for too long
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years,
        httpOnly: true, //in your js code and frontend you cannot access the cookie
        secure: false, //cookie only works in https
        sameSite: "lax", //csrf
      },
      saveUninitialized: true, //it will create a session by default turn it to false so we can add
      secret: "asfasfasfasfasfacWTGSD",
      resave: false,
    })
  );
  //for building schema and running controllers or resolvers
  //for GRAPHQL
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [QuizResolver, MultippleChoiceResolver, AnswerResolver],
      validate: false,
    }),
    //to access an object
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  //to create a graphql endpoint for us on express
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(5000, () => {
    console.log("server is connected in 5000");
  });
};

main().catch((e) => {
  console.log(e);
});
