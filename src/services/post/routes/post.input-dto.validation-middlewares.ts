// src/services/blog/routes/blog.input-dto.validation-middlewares.ts
import { body } from 'express-validator';
import { resourceTypeValidation } from "../../../core/middlewares/validation/resource-type.validation-middleware";
import { ResourceType } from "../../../core/types/resource-type";
import { dataIdMatchValidation } from "../../../core/middlewares/validation/params-id.validation-middleware";

const titleValidation = body('data.attributes.title')
  .isString()
  .withMessage('title should be a string')
  .trim()
  .isLength({ min: 2, max: 30 }) // ✅ Added isLength check
  .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('data.attributes.shortDescription')
  .isString()
  .withMessage('shortDescription should be a string')
  .trim()
  .isLength({ min: 2, max: 100 }) // ✅ Added isLength check
  .withMessage('Length of shortDescription is not correct')
  .optional({ nullable: true }); // ✅ Moved optional to the end

const contentValidation = body('data.attributes.content')
  .isString()
  .withMessage('content should be a string')
  .trim()
  .isLength({ min: 2, max: 1000 }) // ✅ Added isLength check
  .withMessage('Length of content is not correct')
  .optional({ nullable: true }); // ✅ Moved optional to the end

export const postCreateInputValidation = [
  resourceTypeValidation(ResourceType.Blogs),
  titleValidation,
  shortDescriptionValidation,
  contentValidation
];

export const postUpdateInputValidation = [
  resourceTypeValidation(ResourceType.Blogs),
  dataIdMatchValidation,
  titleValidation,
  shortDescriptionValidation,
  contentValidation
];