import { body } from 'express-validator';
import {resourceTypeValidation} from "../../../core/middlewares/validation/resource-type.validation-middleware";
import {ResourceType} from "../../../core/types/resource-type";
import {dataIdMatchValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";


const titleValidation = body('data.attributes.title')
  .isString()
  .withMessage('title should be string')
  .trim()
  .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('data.attributes.shortDescription').optional({ nullable: true }) // Позволяет значению быть null.isString()
  .isString().withMessage('shortDescription should be string')
  .trim()
  .withMessage('Length of shortDescription is not correct');


const contentValidation = body('data.attributes.content').optional({ nullable: true }) // Позволяет значению быть null.isString()
  .isString()
  .withMessage('content should be string')
  .trim()
  .withMessage('Length of content is not correct');

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