"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = void 0;
// src/services/blog/routes/blog.input-dto.validation-middlewares.ts
const express_validator_1 = require("express-validator");
exports.titleValidation = (0, express_validator_1.body)('title')
    .isString()
    .withMessage('title should be a string')
    .trim()
    .isLength({ min: 2, max: 30 }) // ✅ Added isLength check
    .withMessage('Length of title is not correct');
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .isString()
    .withMessage('shortDescription should be a string')
    .trim()
    .isLength({ min: 2, max: 100 }) // ✅ Added isLength check
    .withMessage('Length of shortDescription is not correct')
    .optional({ nullable: true }); // ✅ Moved optional to the end
exports.contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .withMessage('content should be a string')
    .trim()
    .isLength({ min: 2, max: 1000 }) // ✅ Added isLength check
    .withMessage('Length of content is not correct')
    .optional({ nullable: true }); // ✅ Moved optional to the end
