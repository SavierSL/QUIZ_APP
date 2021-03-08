"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizResolver = void 0;
const Quiz_1 = require("../Entities/Quiz");
const type_graphql_1 = require("type-graphql");
const QuizSet_1 = require("../Entities/QuizSet");
let QuizResolver = class QuizResolver {
    getQuiz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = yield Quiz_1.Quiz.findOne({ id: id }, { relations: ["multipleChoices", "quizSet"] });
            return quiz;
        });
    }
    getQuizSet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = yield QuizSet_1.QuizSet.findOne({ id: id }, { relations: ["quizzes", "quizzes.multipleChoices"] });
            return quiz;
        });
    }
    createQuizSet(title, creatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizSet = yield QuizSet_1.QuizSet.create({ title, creatorId }).save();
            return quizSet;
        });
    }
    makeQuiz(question, itemNumber, answer, quizSetId, creatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const makeQuiz = yield Quiz_1.Quiz.create({
                question,
                answer,
                quizSetId,
                itemNumber,
                creatorId,
            }).save();
            return makeQuiz;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Quiz_1.Quiz, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "getQuiz", null);
__decorate([
    type_graphql_1.Query(() => QuizSet_1.QuizSet, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "getQuizSet", null);
__decorate([
    type_graphql_1.Mutation(() => QuizSet_1.QuizSet),
    __param(0, type_graphql_1.Arg("title")),
    __param(1, type_graphql_1.Arg("creatorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "createQuizSet", null);
__decorate([
    type_graphql_1.Mutation(() => Quiz_1.Quiz),
    __param(0, type_graphql_1.Arg("question")),
    __param(1, type_graphql_1.Arg("itemNumber")),
    __param(2, type_graphql_1.Arg("answer")),
    __param(3, type_graphql_1.Arg("quizSetId")),
    __param(4, type_graphql_1.Arg("creatorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Number, Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "makeQuiz", null);
QuizResolver = __decorate([
    type_graphql_1.Resolver()
], QuizResolver);
exports.QuizResolver = QuizResolver;
//# sourceMappingURL=quiz.js.map