"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = exports.createErrorMessages = void 0;
const express_validator_1 = require("express-validator");
const http_statuses_1 = require("../../types/http-statuses");
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
const formaValidationError = (error) => {
    const expressError = error;
    return {
        status: http_statuses_1.HttpStatus.BadRequest,
        source: expressError.path,
        detail: expressError.msg,
    };
};
const inputValidationResultMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req)
        .formatWith(formaValidationError)
        .array({ onlyFirstError: true });
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).json((0, exports.createErrorMessages)(errors));
        return;
    }
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;
