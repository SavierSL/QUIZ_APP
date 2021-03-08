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
exports.AnswerResolver = void 0;
const Answer_1 = require("../Entities/Answer");
const Quiz_1 = require("../Entities/Quiz");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let AnswerResolver = class AnswerResolver extends typeorm_1.BaseEntity {
    answer(studentId, quizSetId, itemNumber, quizId, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield Quiz_1.Quiz.findOne({ id: quizId });
            let isCorrect = false;
            if ((question === null || question === void 0 ? void 0 : question.answer) === answer) {
                isCorrect = true;
            }
            const createAnswer = yield Answer_1.Answer.create({
                quizSetId,
                quizId,
                isCorrect,
                studentId,
                itemNumber,
                question: question === null || question === void 0 ? void 0 : question.question,
                answer,
            }).save();
            return createAnswer;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Answer_1.Answer),
    __param(0, type_graphql_1.Arg("studentId")),
    __param(1, type_graphql_1.Arg("quizSetId")),
    __param(2, type_graphql_1.Arg("itemNumber")),
    __param(3, type_graphql_1.Arg("quizId")),
    __param(4, type_graphql_1.Arg("answer")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], AnswerResolver.prototype, "answer", null);
AnswerResolver = __decorate([
    type_graphql_1.Resolver()
], AnswerResolver);
exports.AnswerResolver = AnswerResolver;
//# sourceMappingURL=answer.js.map