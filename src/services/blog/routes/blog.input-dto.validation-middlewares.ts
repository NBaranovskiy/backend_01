import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { dataIdMatchValidation } from "../../../core/middlewares/validation/params-id.validation-middleware";
const { validationResult } = require('express-validator');
// Middleware для проверки результатов валидации
const validationCheck = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
};

const nameValidation = body('name')
  .isString()
  .withMessage('name should be string')
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
  .isString()
  .withMessage('description should be a string')
  .trim()
  .isLength({ min: 2, max: 500 })
  .withMessage('Length of description is not correct')
  .optional({ nullable: true });

const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('websiteUrl should be a string')
  .trim()
  .isLength({ max: 100 })
  .withMessage('websiteUrl cannot exceed 100 characters')
  .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
  .withMessage('Invalid website URL format. URL must start with "https://" and be valid.');

export const blogCreateInputValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
  validationCheck, // 👈 Добавляем middleware сюда
];

export const blogUpdateInputValidation = [
  dataIdMatchValidation,
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
  validationCheck, // 👈 И сюда
];