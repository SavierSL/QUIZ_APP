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
exports.AnswerSet = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Answer_1 = require("./Answer");
let AnswerSet = class AnswerSet extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AnswerSet.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AnswerSet.prototype, "studentId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AnswerSet.prototype, "quizSetId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AnswerSet.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => [Answer_1.Answer], { nullable: true }),
    typeorm_1.OneToMany(() => Answer_1.Answer, (answer) => answer.answerSet),
    __metadata("design:type", Array)
], AnswerSet.prototype, "answers", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], AnswerSet.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], AnswerSet.prototype, "updatedAt", void 0);
AnswerSet = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], AnswerSet);
exports.AnswerSet = AnswerSet;
//# sourceMappingURL=AnswerSet.js.map