"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateInputValidation = exports.blogCreateInputValidation = void 0;
const express_validator_1 = require("express-validator");
const resource_type_validation_middleware_1 = require("../../../core/middlewares/validation/resource-type.validation-middleware");
const resource_type_1 = require("../../../core/types/resource-type");
const params_id_validation_middleware_1 = require("../../../core/middlewares/validation/params-id.validation-middleware");
// src/services/blog/routes/blog.input-dto.validation-middlewares.ts
const nameValidation = (0, express_validator_1.body)('data.attributes.name')
    .isString()
    .withMessage('name should be string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Length of name is not correct');
const descriptionValidation = (0, express_validator_1.body)('data.attributes.description')
    .isString()
    .withMessage('description should be a string') // ❌ Исправлено с 'phoneNumber' на 'description'
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Length of description is not correct')
    .optional({ nullable: true }); // ✅ Перенесено в конец
const websiteUrlValidation = (0, express_validator_1.body)('data.attributes.websiteUrl')
    .isString()
    .withMessage('websiteUrl should be a string')
    .trim()
    .isLength({ max: 100 })
    .withMessage('websiteUrl cannot exceed 100 characters')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Invalid website URL format. URL must start with "https://" and be valid.');
exports.blogCreateInputValidation = [
    (0, resource_type_validation_middleware_1.resourceTypeValidation)(resource_type_1.ResourceType.Blogs),
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
];
exports.blogUpdateInputValidation = [
    (0, resource_type_validation_middleware_1.resourceTypeValidation)(resource_type_1.ResourceType.Blogs),
    params_id_validation_middleware_1.dataIdMatchValidation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
];
