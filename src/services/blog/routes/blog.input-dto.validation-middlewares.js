"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
const { validationResult } = require('express-validator');
exports.nameValidation = (0, express_validator_1.body)('name')
    .isString()
    .withMessage('name should be string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Length of name is not correct');
exports.descriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .withMessage('description should be a string')
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Length of description is not correct')
    .optional({ nullable: true });
exports.websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .withMessage('websiteUrl should be a string')
    .trim()
    .isLength({ max: 100 })
    .withMessage('websiteUrl cannot exceed 100 characters')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Invalid website URL format. URL must start with "https://" and be valid.');
