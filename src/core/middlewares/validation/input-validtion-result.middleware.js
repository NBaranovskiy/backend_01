"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = exports.createErrorMessages = void 0;
const express_validator_1 = require("express-validator");
const http_statuses_1 = require("../../types/http-statuses");
/**
 * Creates a formatted error list output from an array of validation errors.
 * @param errors An array of ValidationErrorType objects.
 * @returns A ValidationErrorListOutput object.
 */
const createErrorMessages = (errors) => {
    return {
        errors: errors.map((error) => {
            var _a, _b;
            return ({
                status: error.status,
                detail: error.detail, //error message
                source: { pointer: (_a = error.source) !== null && _a !== void 0 ? _a : '' }, //error field
                code: (_b = error.code) !== null && _b !== void 0 ? _b : null, //domain error code
            });
        }),
    };
};
exports.createErrorMessages = createErrorMessages;
/**
 * Formats a raw ValidationError from express-validator into a custom ValidationErrorType.
 * @param error The ValidationError object from express-validator.
 * @returns A ValidationErrorType object.
 */
const formaValidationError = (error) => {
    const expressError = error;
    return {
        status: http_statuses_1.HttpStatus.BadRequest,
        source: expressError.path,
        detail: expressError.msg,
    };
};
/**
 * Middleware to handle validation results and send a formatted error response.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
const inputValidationResultMiddleware = (req, res, next) => {
    // Format the validation errors using the formaValidationError function
    const errors = (0, express_validator_1.validationResult)(req)
        .formatWith(formaValidationError)
        .array({ onlyFirstError: true });
    if (errors.length > 0) {
        // If there are errors, create a formatted response and send it
        res.status(http_statuses_1.HttpStatus.BadRequest).json((0, exports.createErrorMessages)(errors));
        return;
    }
    // If there are no errors, proceed to the next middleware
    next();
    return;
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;
