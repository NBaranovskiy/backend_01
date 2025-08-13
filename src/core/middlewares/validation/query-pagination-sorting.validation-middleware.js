"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationAndSortingValidation = paginationAndSortingValidation;
// pagination-and-sorting.validation.ts
const express_validator_1 = require("express-validator");
const sort_direction_1 = require("../../types/sort-direction");
const pagination_and_sorting_1 = require("../../types/pagination-and-sorting");
// Дефолтные значения
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = sort_direction_1.SortDirection.Desc;
function paginationAndSortingValidation(sortFieldsEnum, defaultSortBy = pagination_and_sorting_1.paginationAndSortingDefault.sortBy) {
    const allowedSortFields = Object.values(sortFieldsEnum);
    if (!allowedSortFields.includes(pagination_and_sorting_1.paginationAndSortingDefault.sortBy)) {
        allowedSortFields.push(pagination_and_sorting_1.paginationAndSortingDefault.sortBy);
    }
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
            // ✅ Используем переданное значение по умолчанию
            .default(defaultSortBy)
            .isIn(allowedSortFields)
            .withMessage(`Invalid sort field. Allowed values: ${allowedSortFields.join(', ')}`),
        (0, express_validator_1.query)('sortDirection')
            .optional()
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(sort_direction_1.SortDirection))
            .withMessage(`Sort direction must be one of: ${Object.values(sort_direction_1.SortDirection).join(', ')}`),
    ];
}
