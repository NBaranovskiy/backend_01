// src/services/blog/routes/blog.input-dto.validation-middlewares.ts
import {body, validationResult} from 'express-validator';
import { ResourceType } from "../../../core/types/resource-type";
import { dataIdMatchValidation } from "../../../core/middlewares/validation/params-id.validation-middleware";
import {NextFunction, Request, Response} from "express";

const validationCheck = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
};

const titleValidation = body('title')
  .isString()
  .withMessage('title should be a string')
  .trim()
  .isLength({ min: 2, max: 30 }) // ✅ Added isLength check
  .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('shortDescription should be a string')
  .trim()
  .isLength({ min: 2, max: 100 }) // ✅ Added isLength check
  .withMessage('Length of shortDescription is not correct')
  .optional({ nullable: true }); // ✅ Moved optional to the end

const contentValidation = body('content')
  .isString()
  .withMessage('content should be a string')
  .trim()
  .isLength({ min: 2, max: 1000 }) // ✅ Added isLength check
  .withMessage('Length of content is not correct')
  .optional({ nullable: true }); // ✅ Moved optional to the end

export const postCreateInputValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  validationCheck
];

export const postUpdateInputValidation = [
  dataIdMatchValidation,
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  validationCheck
];