"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationAndSortingValidation = paginationAndSortingValidation;
// pagination-and-sorting.validation.ts
const express_validator_1 = require("express-validator");
const sort_direction_1 = require("../../types/sort-direction");
// Дефолтные значения для пагинации
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = sort_direction_1.SortDirection.Desc; // 'desc'
function paginationAndSortingValidation(sortFieldsEnum, defaultSortBy = 'createdAt') {
    // Собираем все разрешенные поля для сортировки
    const allowedSortFields = new Set([
        ...Object.values(sortFieldsEnum),
        'createdAt' // createdAt - это дефолтное поле для сортировки, его всегда нужно добавлять
    ]);
    const allowedSortFieldsArray = Array.from(allowedSortFields);
    return [
        (0, express_validator_1.query)('pageNumber')
            .optional()
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),
        (0, express_validator_1.query)('pageSize')
            .optional()
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be between 1 and 100')
            .toInt(),
        (0, express_validator_1.query)('sortBy')
            .optional()
            .default(defaultSortBy)
            .isIn(allowedSortFieldsArray)
            .withMessage(`Invalid sort field. Allowed values: ${allowedSortFieldsArray.join(', ')}`),
        (0, express_validator_1.query)('sortDirection')
            .optional()
            .default(DEFAULT_SORT_DIRECTION)
            // Проверяем, что значение — 'asc' или 'desc'
            .isIn([sort_direction_1.SortDirection.Asc, sort_direction_1.SortDirection.Desc])
            .withMessage(`Sort direction must be one of: ${sort_direction_1.SortDirection.Asc}, ${sort_direction_1.SortDirection.Desc}`),
    ];
}
