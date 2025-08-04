import { body } from 'express-validator';
import {resourceTypeValidation} from "../../../core/middlewares/validation/resource-type.validation-middleware";
import {ResourceType} from "../../../core/types/resource-type";
import {dataIdMatchValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";

// src/services/blog/routes/blog.input-dto.validation-middlewares.ts

const nameValidation = body('data.attributes.name')
  .isString()
  .withMessage('name should be string')
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage('Length of name is not correct');

const descriptionValidation = body('data.attributes.description')
  .isString()
  .withMessage('description should be a string') // ❌ Исправлено с 'phoneNumber' на 'description'
  .trim()
  .isLength({ min: 2, max: 500 })
  .withMessage('Length of description is not correct')
  .optional({ nullable: true }); // ✅ Перенесено в конец

const websiteUrlValidation = body('data.attributes.websiteUrl')
  .isString()
  .withMessage('websiteUrl should be a string')
  .trim()
  .isLength({ max: 100 })
  .withMessage('websiteUrl cannot exceed 100 characters')
  .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
  .withMessage('Invalid website URL format. URL must start with "https://" and be valid.');

export const blogCreateInputValidation = [
  resourceTypeValidation(ResourceType.Blogs),
  nameValidation,
  descriptionValidation,
  websiteUrlValidation
];

export const blogUpdateInputValidation = [
  resourceTypeValidation(ResourceType.Blogs),
  dataIdMatchValidation,
  nameValidation,
  descriptionValidation,
  websiteUrlValidation
];