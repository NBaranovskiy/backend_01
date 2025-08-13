// pagination-and-sorting.validation.ts
import { query } from 'express-validator';
import { SortDirection } from '../../types/sort-direction';
import {PaginationAndSorting, paginationAndSortingDefault} from '../../types/pagination-and-sorting';

// Дефолтные значения
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = SortDirection.Desc;

export function paginationAndSortingValidation<T extends string>(
  sortFieldsEnum: Record<string, T>,
  defaultSortBy: T | 'createdAt' = paginationAndSortingDefault.sortBy as T,
) {
  const allowedSortFields = Object.values(sortFieldsEnum);
  if (!allowedSortFields.includes(paginationAndSortingDefault.sortBy as T)) {
    allowedSortFields.push(paginationAndSortingDefault.sortBy as T);
  }

  return [
    query('pageNumber')
      .optional()
      .default(DEFAULT_PAGE_NUMBER)
      .isInt({ min: 1 })
      .withMessage('Page number must be a positive integer')
      .toInt(),

    query('pageSize')
      .optional()
      .default(DEFAULT_PAGE_SIZE)
      .isInt({ min: 1, max: 100 })
      .withMessage('Page size must be between 1 and 100')
      .toInt(),

    query('sortBy')
      .optional()
      // ✅ Используем переданное значение по умолчанию
      .default(defaultSortBy)
      .isIn(allowedSortFields)
      .withMessage(
        `Invalid sort field. Allowed values: ${allowedSortFields.join(', ')}`,
      ),

    query('sortDirection')
      .optional()
      .default(DEFAULT_SORT_DIRECTION)
      .isIn(Object.values(SortDirection))
      .withMessage(
        `Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`,
      ),
  ];
}