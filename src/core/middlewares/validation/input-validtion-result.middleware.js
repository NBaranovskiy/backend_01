"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = exports.createErrorMessages = void 0;
const express_validator_1 = require("express-validator");
const http_statuses_1 = require("../../types/http-statuses");
// ⚠️ Изменяем эту функцию, чтобы она соответствовала формату тестов
const createErrorMessages = (errors) => {
    return {
        errorsMessages: errors.map((error) => ({
            message: error.msg,
            field: error.path, // 'path' содержит имя поля с ошибкой
        })),
    };
};
exports.createErrorMessages = createErrorMessages;
/**
 * Formats a raw ValidationError from express-validator into a custom FieldValidationError.
 * @param error The ValidationError object from express-validator.
 * @returns A ValidationErrorType object.
 */
const formaValidationError = (error) => {
    return error; // Просто возвращаем как FieldValidationError
};
/**
 * Middleware to handle validation results and send a formatted error response.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
const inputValidationResultMiddleware = (req, res, next) => {
    // Получаем ошибки, форматируя их как FieldValidationError
    const errors = (0, express_validator_1.validationResult)(req)
        .formatWith(formaValidationError)
        .array({ onlyFirstError: true });
    if (errors.length > 0) {
        // Если есть ошибки, используем исправленную функцию createErrorMessages
        res.status(http_statuses_1.HttpStatus.BadRequest).json((0, exports.createErrorMessages)(errors));
        return;
    }
    // Если ошибок нет, продолжаем
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;
