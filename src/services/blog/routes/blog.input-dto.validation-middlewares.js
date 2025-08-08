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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBlogUpdate = exports.validateBlogInput = void 0;
const express_validator_1 = require("express-validator");
const params_id_validation_middleware_1 = require("../../../core/middlewares/validation/params-id.validation-middleware");
const { validationResult } = require('express-validator');
const nameValidation = (0, express_validator_1.body)('name')
    .isString()
    .withMessage('name should be string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Length of name is not correct');
const descriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .withMessage('description should be a string')
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Length of description is not correct')
    .optional({ nullable: true });
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .withMessage('websiteUrl should be a string')
    .trim()
    .isLength({ max: 100 })
    .withMessage('websiteUrl cannot exceed 100 characters')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Invalid website URL format. URL must start with "https://" and be valid.');
const validateBlogInput = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Выбираем, какие валидаторы запускать
    const validations = [
        nameValidation,
        descriptionValidation,
        websiteUrlValidation,
    ];
    // Проходим по всем валидаторам
    for (let validation of validations) {
        yield validation.run(req);
    }
    // Проверяем результаты
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Если всё хорошо, передаем управление дальше
    next();
    return;
});
exports.validateBlogInput = validateBlogInput;
const validateBlogUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Выбираем, какие валидаторы запускать
    const validations = [
        params_id_validation_middleware_1.dataIdMatchValidation,
        nameValidation,
        descriptionValidation,
        websiteUrlValidation
    ];
    // Проходим по всем валидаторам
    for (let validation of validations) {
        yield validation.run(req);
    }
    // Проверяем результаты
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Если всё хорошо, передаем управление дальше
    next();
    return;
});
exports.validateBlogUpdate = validateBlogUpdate;
