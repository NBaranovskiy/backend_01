// pagination-and-sorting.validation.ts
import { query } from 'express-validator';
import { SortDirection } from '../../types/sort-direction';

// Дефолтные значения для пагинации
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = SortDirection.Desc; // 'desc'

export function paginationAndSortingValidation<T extends string>(
  sortFieldsEnum: Record<string, T>,
  defaultSortBy: T | 'createdAt' = 'createdAt' as T,
) {
  // Собираем все разрешенные поля для сортировки
  const allowedSortFields = new Set<string>([
    ...Object.values(sortFieldsEnum),
    'createdAt' // createdAt - это дефолтное поле для сортировки, его всегда нужно добавлять
  ]);

  const allowedSortFieldsArray = Array.from(allowedSortFields);

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
      .default(defaultSortBy)
      .isIn(allowedSortFieldsArray)
      .withMessage(
        `Invalid sort field. Allowed values: ${allowedSortFieldsArray.join(', ')}`,
      ),

    query('sortDirection')
      .optional()
      .default(DEFAULT_SORT_DIRECTION)
      // Проверяем, что значение — 'asc' или 'desc'
      .isIn([SortDirection.Asc, SortDirection.Desc])
      .withMessage(
        `Sort direction must be one of: ${SortDirection.Asc}, ${SortDirection.Desc}`,
      ),
  ];
}