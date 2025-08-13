"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationAndSortingDefault = void 0;
// core/types/pagination-and-sorting.ts
const sort_direction_1 = require("./sort-direction");
// A universal default object for pagination and sorting
exports.paginationAndSortingDefault = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: sort_direction_1.SortDirection.Desc,
};
