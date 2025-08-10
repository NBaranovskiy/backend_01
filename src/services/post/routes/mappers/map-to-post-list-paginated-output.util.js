"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPostListPaginatedOutput = mapToPostListPaginatedOutput;
const map_to_post_output_util_1 = require("./map-to-post-output.util");
function mapToPostListPaginatedOutput(posts, meta) {
    const pagesCount = Math.ceil(meta.totalCount / meta.pageSize);
    return {
        pagesCount,
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: posts.map(map_to_post_output_util_1.mapToPostOutput), // Используем обновлённый маппер
    };
}
