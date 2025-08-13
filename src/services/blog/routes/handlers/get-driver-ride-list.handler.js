"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogsPostsListHandler = getBlogsPostsListHandler;
const errors_handler_1 = require("../../../../core/errors/errors.handler");
const post_service_1 = require("../../../post/application/post.service");
const map_to_post_list_paginated_output_util_1 = require("../../../post/routes/mappers/map-to-post-list-paginated-output.util");
function getBlogsPostsListHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blogId = req.params.blogId;
            const queryInput = req.query;
            const { items, totalCount } = yield post_service_1.postService.findPostByBlog(queryInput, blogId);
            const PostListOutput = (0, map_to_post_list_paginated_output_util_1.mapToPostListPaginatedOutput)(items, {
                pageNumber: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount,
            });
            res.send(PostListOutput);
        }
        catch (e) {
            (0, errors_handler_1.errorsHandler)(e, res);
        }
    });
}
