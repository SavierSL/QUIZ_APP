"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const Quiz_1 = require("./Entities/Quiz");
const quiz_1 = require("./Resolvers/quiz");
const multipleChoice_1 = require("./Resolvers/multipleChoice");
const MultipleChoices_1 = require("./Entities/MultipleChoices");
const QuizSet_1 = require("./Entities/QuizSet");
const answer_1 = require("./Resolvers/answer");
const Answer_1 = require("./Entities/Answer");
const AnswerSet_1 = require("./Entities/AnswerSet");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        type: "postgres",
        database: "quiz",
        username: "postgres",
        password: "xxkaa548",
        logging: true,
        synchronize: true,
        entities: [Quiz_1.Quiz, MultipleChoices_1.MultipleChoices, QuizSet_1.QuizSet, Answer_1.Answer, AnswerSet_1.AnswerSet],
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: "cid",
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        },
        saveUninitialized: true,
        secret: "asfasfasfasfasfacWTGSD",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [quiz_1.QuizResolver, multipleChoice_1.MultippleChoiceResolver, answer_1.AnswerResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(5000, () => {
        console.log("server is connected in 5000");
    });
});
main().catch((e) => {
    console.log(e);
});
//# sourceMappingURL=server.js.map