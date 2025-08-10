"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToBlogListPaginatedOutput = mapToBlogListPaginatedOutput;
const map_to_driver_output_util_1 = require("./map-to-driver-output.util");
function mapToBlogListPaginatedOutput(blogs, meta) {
    const pagesCount = Math.ceil(meta.totalCount / meta.pageSize);
    return {
        pagesCount,
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        // Используем mapToBlogOutput, чтобы преобразовать каждый блог в плоский объект
        items: blogs.map(map_to_driver_output_util_1.mapToBlogOutput),
    };
}
