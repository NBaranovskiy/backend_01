"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const query_pagination_sorting_validation_middleware_1 = require("../../../core/middlewares/validation/query-pagination-sorting.validation-middleware");
const input_validtion_result_middleware_1 = require("../../../core/middlewares/validation/input-validtion-result.middleware");
const params_id_validation_middleware_1 = require("../../../core/middlewares/validation/params-id.validation-middleware");
const super_admin_guard_middleware_1 = require("../../../auth/middlewares/super-admin.guard-middleware");
const post_sort_field_1 = require("./input/post-sort-field");
const get_post_handler_1 = require("./handlers/get-post.handler");
const get_post_list_handler_1 = require("./handlers/get-post-list.handler");
const create_post_handler_1 = require("./handlers/create-post.handler");
const update_post_handler_1 = require("./handlers/update-post.handler");
const delete_post_handler_1 = require("./handlers/delete-post.handler");
const post_input_dto_validation_middlewares_1 = require("./post.input-dto.validation-middlewares");
exports.postRoute = (0, express_1.Router)({});
exports.postRoute
    .get('', (0, query_pagination_sorting_validation_middleware_1.paginationAndSortingValidation)(post_sort_field_1.PostSortField), input_validtion_result_middleware_1.inputValidationResultMiddleware, get_post_list_handler_1.getPostListHandler)
    .get('/:id', params_id_validation_middleware_1.idValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, get_post_handler_1.getPostHandler)
    .post('', super_admin_guard_middleware_1.superAdminGuardMiddleware, post_input_dto_validation_middlewares_1.titleValidation, post_input_dto_validation_middlewares_1.shortDescriptionValidation, post_input_dto_validation_middlewares_1.contentValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, create_post_handler_1.createPostHandler)
    .put('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, params_id_validation_middleware_1.idValidation, post_input_dto_validation_middlewares_1.titleValidation, post_input_dto_validation_middlewares_1.shortDescriptionValidation, post_input_dto_validation_middlewares_1.contentValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, update_post_handler_1.updatePostHandler)
    .delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, params_id_validation_middleware_1.idValidation, input_validtion_result_middleware_1.inputValidationResultMiddleware, delete_post_handler_1.deletePostHandler);
