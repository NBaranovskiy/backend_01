"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSortAndPaginationIfNotExist = setDefaultSortAndPaginationIfNotExist;
// core/utils/pagination-utils.ts
const pagination_and_sorting_1 = require("../types/pagination-and-sorting");
function setDefaultSortAndPaginationIfNotExist(query) {
    var _a;
    const sortBy = ((_a = query.sortBy) !== null && _a !== void 0 ? _a : pagination_and_sorting_1.paginationAndSortingDefault.sortBy);
    return Object.assign(Object.assign(Object.assign({}, pagination_and_sorting_1.paginationAndSortingDefault), query), { sortBy });
}
