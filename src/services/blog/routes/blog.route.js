"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const query_pagination_sorting_validation_middleware_1 = require("../../../core/middlewares/validation/query-pagination-sorting.validation-middleware");
const input_validtion_result_middleware_1 = require("../../../core/middlewares/validation/input-validtion-result.middleware");
const params_id_validation_middleware_1 = require("../../../core/middlewares/validation/params-id.validation-middleware");
const super_admin_guard_middleware_1 = require("../../../auth/middlewares/super-admin.guard-middleware");
const blog_sort_field_1 = require("./input/blog-sort-field");
const get_blog_list_handler_1 = require("./handlers/get-blog-list.handler");
const get_blog_handler_1 = require("./handlers/get-blog.handler");
const create_blog_handler_1 = require("./handlers/create-blog.handler");
const update_blog_handler_1 = require("./handlers/update-blog.handler");
const delete_blog_handler_1 = require("./handlers/delete-blog.handler");
const get_driver_ride_list_handler_1 = require("./handlers/get-driver-ride-list.handler");
const post_sort_field_1 = require("../../post/routes/input/post-sort-field");
const blog_input_dto_validation_middlewares_1 = require("./blog.input-dto.validation-middlewares");
const create_postToIdBlog_handler_1 = require("./handlers/create-postToIdBlog.handler");
const post_input_dto_validation_middlewares_1 = require("../../post/routes/post.input-dto.validation-middlewares");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute
    .get('', (0, query_pagination_sorting_validation_middleware_1.paginationAndSortingValidation)(blog_sort_field_1.BlogSortField), input_validtion_result_middleware_1.inputValidationResultMiddleware, get_blog_list_handler_1.getBlogListHandler)
    .get('/:id', params_id_validation_middleware_1.idValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, get_blog_handler_1.getBlogHandler)
    .post('', super_admin_guard_middleware_1.superAdminGuardMiddleware, blog_input_dto_validation_middlewares_1.nameValidation, blog_input_dto_validation_middlewares_1.descriptionValidation, blog_input_dto_validation_middlewares_1.websiteUrlValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, create_blog_handler_1.createBlogHandler)
    .post('/:id/posts', super_admin_guard_middleware_1.superAdminGuardMiddleware, params_id_validation_middleware_1.idValidation, post_input_dto_validation_middlewares_1.titleValidation, post_input_dto_validation_middlewares_1.shortDescriptionValidation, post_input_dto_validation_middlewares_1.contentValidation, (0, query_pagination_sorting_validation_middleware_1.paginationAndSortingValidation)(post_sort_field_1.PostSortField), input_validtion_result_middleware_1.inputValidationResultMiddleware, create_postToIdBlog_handler_1.createBlogsPostsListHandler)
    .put('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, params_id_validation_middleware_1.idValidation, blog_input_dto_validation_middlewares_1.nameValidation, blog_input_dto_validation_middlewares_1.descriptionValidation, blog_input_dto_validation_middlewares_1.websiteUrlValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, update_blog_handler_1.updateBlogHandler)
    .delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, params_id_validation_middleware_1.idValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, delete_blog_handler_1.deleteBlogHandler)
    .get('/:id/posts', params_id_validation_middleware_1.idValidation, (0, query_pagination_sorting_validation_middleware_1.paginationAndSortingValidation)(post_sort_field_1.PostSortField), input_validtion_result_middleware_1.inputValidationResultMiddleware, get_driver_ride_list_handler_1.getBlogsPostsListHandler);
