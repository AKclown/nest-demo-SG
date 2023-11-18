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
exports.CccDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CccDto {
}
exports.CccDto = CccDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'aaa',
        enum: ['a1', 'a2', 'a3'],
        maxLength: 30,
        minLength: 2,
        required: true,
    }),
    __metadata("design:type", String)
], CccDto.prototype, "aaa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'bbb',
        maximum: 60,
        minimum: 40,
        default: 50,
        example: 55,
    }),
    __metadata("design:type", Number)
], CccDto.prototype, "bbb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'ccc', required: false }),
    __metadata("design:type", Array)
], CccDto.prototype, "ccc", void 0);
//# sourceMappingURL=ccc.dto.js.map