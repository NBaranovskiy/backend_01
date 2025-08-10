import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationErrorType } from '../../types/validationError';
import { HttpStatus } from '../../types/http-statuses';
import { ValidationErrorListOutput } from '../../types/validationError.dto';

/**
 * Creates a formatted error list output from an array of validation errors.
 * @param errors An array of ValidationErrorType objects.
 * @returns A ValidationErrorListOutput object.
 */
export const createErrorMessages = (
  errors: ValidationErrorType[],
): ValidationErrorListOutput => {
  return {
    errors: errors.map((error) => ({
      status: error.status,
      detail: error.detail, //error message
      source: { pointer: error.source ?? '' }, //error field
      code: error.code ?? null, //domain error code
    })),
  };
};

/**
 * Formats a raw ValidationError from express-validator into a custom ValidationErrorType.
 * @param error The ValidationError object from express-validator.
 * @returns A ValidationErrorType object.
 */
const formaValidationError = (error: ValidationError): ValidationErrorType => {
  const expressError = error as unknown as FieldValidationError;

  return {
    status: HttpStatus.BadRequest,
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
export const inputValidationResultMiddleware = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  // Format the validation errors using the formaValidationError function
  const errors = validationResult(req)
    .formatWith(formaValidationError)
    .array({ onlyFirstError: true });

  if (errors.length > 0) {
    // If there are errors, create a formatted response and send it
    res.status(HttpStatus.BadRequest).json(createErrorMessages(errors));
    return;
  }

  // If there are no errors, proceed to the next middleware
  next();
  return;
};
