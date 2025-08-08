import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { dataIdMatchValidation } from "../../../core/middlewares/validation/params-id.validation-middleware";
const { validationResult } = require('express-validator');

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

export const validateBlogInput = async (req: Request, res: Response, next: NextFunction) => {
  // Выбираем, какие валидаторы запускать
  const validations = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
  ];

  // Проходим по всем валидаторам
  for (let validation of validations) {
    await validation.run(req);
  }

  // Проверяем результаты
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Если всё хорошо, передаем управление дальше
  next();
  return;
};

export const validateBlogUpdate = async (req: Request, res: Response, next: NextFunction) => {
  // Выбираем, какие валидаторы запускать
  const validations = [
    dataIdMatchValidation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
  ];

  // Проходим по всем валидаторам
  for (let validation of validations) {
    await validation.run(req);
  }

  // Проверяем результаты
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Если всё хорошо, передаем управление дальше
  next();
  return;
};