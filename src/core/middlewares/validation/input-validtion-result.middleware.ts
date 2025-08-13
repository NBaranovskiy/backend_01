import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../types/http-statuses';

// ⚠️ Изменяем эту функцию, чтобы она соответствовала формату тестов
export const createErrorMessages = (
  errors: FieldValidationError[], // Используем FieldValidationError, чтобы иметь доступ к полям msg и path
): any => { // Возвращаемый тип можно сделать более точным, но any пока подойдет
  return {
    errorsMessages: errors.map((error) => ({
      message: error.msg,
      field: error.path, // 'path' содержит имя поля с ошибкой
    })),
  };
};

/**
 * Formats a raw ValidationError from express-validator into a custom FieldValidationError.
 * @param error The ValidationError object from express-validator.
 * @returns A ValidationErrorType object.
 */
const formaValidationError = (error: ValidationError): FieldValidationError => {
  return error as FieldValidationError; // Просто возвращаем как FieldValidationError
};

/**
 * Middleware to handle validation results and send a formatted error response.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
export const inputValidationResultMiddleware = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  // Получаем ошибки, форматируя их как FieldValidationError
  const errors = validationResult(req)
    .formatWith(formaValidationError)
    .array({ onlyFirstError: true });

  if (errors.length > 0) {
    // Если есть ошибки, используем исправленную функцию createErrorMessages
    res.status(HttpStatus.BadRequest).json(createErrorMessages(errors));
    return;
  }

  // Если ошибок нет, продолжаем
  next();
};