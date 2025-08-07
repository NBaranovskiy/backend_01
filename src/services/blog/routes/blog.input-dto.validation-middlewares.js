"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateInputValidation = exports.blogCreateInputValidation = void 0;
const express_validator_1 = require("express-validator");
const params_id_validation_middleware_1 = require("../../../core/middlewares/validation/params-id.validation-middleware");
const { validationResult } = require('express-validator');
// Middleware для проверки результатов валидации
const validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
    return;
};
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
exports.blogCreateInputValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    validationCheck, // 👈 Добавляем middleware сюда
];
exports.blogUpdateInputValidation = [
    params_id_validation_middleware_1.dataIdMatchValidation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    validationCheck, // 👈 И сюда
];
