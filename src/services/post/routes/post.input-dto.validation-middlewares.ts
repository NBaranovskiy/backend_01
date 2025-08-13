// src/services/blog/routes/blog.input-dto.validation-middlewares.ts
import {body} from 'express-validator';


export const titleValidation = body('title')
  .isString()
  .withMessage('title should be a string')
  .trim()
  .isLength({ min: 2, max: 30 }) // ✅ Added isLength check
  .withMessage('Length of title is not correct');

export const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('shortDescription should be a string')
  .trim()
  .isLength({ min: 2, max: 100 }) // ✅ Added isLength check
  .withMessage('Length of shortDescription is not correct')

export const contentValidation = body('content')
  .isString()
  .withMessage('content should be a string')
  .trim()
  .isLength({ min: 2, max: 1000 }) // ✅ Added isLength check
  .withMessage('Length of content is not correct')
