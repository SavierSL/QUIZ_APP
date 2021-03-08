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
exports.QuizSet = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Quiz_1 = require("./Quiz");
let QuizSet = class QuizSet extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuizSet.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QuizSet.prototype, "creatorId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], QuizSet.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => [Quiz_1.Quiz], { nullable: true }),
    typeorm_1.OneToMany(() => Quiz_1.Quiz, (quiz) => quiz.quizSet),
    __metadata("design:type", Array)
], QuizSet.prototype, "quizzes", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], QuizSet.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], QuizSet.prototype, "updatedAt", void 0);
QuizSet = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], QuizSet);
exports.QuizSet = QuizSet;
//# sourceMappingURL=QuizSet.js.map