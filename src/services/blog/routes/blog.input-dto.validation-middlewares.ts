import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

export const nameValidation = body('name')
  .isString()
  .withMessage('name should be string')
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage('Length of name is not correct');

export const descriptionValidation = body('description')
  .isString()
  .withMessage('description should be a string')
  .trim()
  .isLength({ min: 2, max: 500 })
  .withMessage('Length of description is not correct')

export const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('websiteUrl should be a string')
  .trim()
  .isLength({ max: 100 })
  .withMessage('websiteUrl cannot exceed 100 characters')
  .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
  .withMessage('Invalid website URL format. URL must start with "https://" and be valid.');