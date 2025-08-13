"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSortAndPaginationIfNotExist = setDefaultSortAndPaginationIfNotExist;
// src/core/middlewares/validation/query-pagination-sorting.validation-middleware.ts
const pagination_and_sorting_1 = require("../types/pagination-and-sorting");
function setDefaultSortAndPaginationIfNotExist(query) {
    var _a;
    return Object.assign(Object.assign(Object.assign({}, pagination_and_sorting_1.paginationAndSortingDefault), query), { sortBy: ((_a = query.sortBy) !== null && _a !== void 0 ? _a : pagination_and_sorting_1.paginationAndSortingDefault.sortBy) });
}
