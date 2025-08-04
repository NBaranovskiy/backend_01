"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpdateInputValidation = exports.postCreateInputValidation = void 0;
// src/services/blog/routes/blog.input-dto.validation-middlewares.ts
const express_validator_1 = require("express-validator");
const resource_type_validation_middleware_1 = require("../../../core/middlewares/validation/resource-type.validation-middleware");
const resource_type_1 = require("../../../core/types/resource-type");
const params_id_validation_middleware_1 = require("../../../core/middlewares/validation/params-id.validation-middleware");
const titleValidation = (0, express_validator_1.body)('data.attributes.title')
    .isString()
    .withMessage('title should be a string')
    .trim()
    .isLength({ min: 2, max: 30 }) // ✅ Added isLength check
    .withMessage('Length of title is not correct');
const shortDescriptionValidation = (0, express_validator_1.body)('data.attributes.shortDescription')
    .isString()
    .withMessage('shortDescription should be a string')
    .trim()
    .isLength({ min: 2, max: 100 }) // ✅ Added isLength check
    .withMessage('Length of shortDescription is not correct')
    .optional({ nullable: true }); // ✅ Moved optional to the end
const contentValidation = (0, express_validator_1.body)('data.attributes.content')
    .isString()
    .withMessage('content should be a string')
    .trim()
    .isLength({ min: 2, max: 1000 }) // ✅ Added isLength check
    .withMessage('Length of content is not correct')
    .optional({ nullable: true }); // ✅ Moved optional to the end
exports.postCreateInputValidation = [
    (0, resource_type_validation_middleware_1.resourceTypeValidation)(resource_type_1.ResourceType.Blogs),
    titleValidation,
    shortDescriptionValidation,
    contentValidation
];
exports.postUpdateInputValidation = [
    (0, resource_type_validation_middleware_1.resourceTypeValidation)(resource_type_1.ResourceType.Blogs),
    params_id_validation_middleware_1.dataIdMatchValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation
];
