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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const MultipleChoices_1 = require("./MultipleChoices");
const QuizSet_1 = require("./QuizSet");
let Quiz = class Quiz extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Quiz.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Quiz.prototype, "creatorId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Quiz.prototype, "itemNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Quiz.prototype, "quizSetId", void 0);
__decorate([
    type_graphql_1.Field(() => QuizSet_1.QuizSet, { nullable: true }),
    typeorm_1.ManyToOne(() => QuizSet_1.QuizSet, (quizSet) => quizSet.quizzes),
    __metadata("design:type", QuizSet_1.QuizSet)
], Quiz.prototype, "quizSet", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Quiz.prototype, "question", void 0);
__decorate([
    type_graphql_1.Field(() => [MultipleChoices_1.MultipleChoices], { nullable: true }),
    typeorm_1.OneToMany(() => MultipleChoices_1.MultipleChoices, (multipleChoices) => multipleChoices.quiz),
    __metadata("design:type", Array)
], Quiz.prototype, "multipleChoices", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Quiz.prototype, "answer", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Quiz.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Quiz.prototype, "updatedAt", void 0);
Quiz = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Quiz);
exports.Quiz = Quiz;
//# sourceMappingURL=Quiz.js.map