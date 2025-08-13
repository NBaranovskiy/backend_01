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
exports.getPostListHandler = getPostListHandler;
const errors_handler_1 = require("../../../../core/errors/errors.handler");
const post_service_1 = require("../../application/post.service");
const map_to_post_list_paginated_output_util_1 = require("../mappers/map-to-post-list-paginated-output.util");
const express_validator_1 = require("express-validator"); // ✅ Импортируем validationResult
const http_statuses_1 = require("../../../../core/types/http-statuses");
function getPostListHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ✅ Проверяем результат валидации. Если есть ошибки, сразу возвращаем 400.
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(http_statuses_1.HttpStatus.BadRequest).json({ errors: errors.array() });
                return;
            }
            // ✅ Теперь TypeScript знает, что req.query имеет правильные типы.
            // Мы можем безопасно использовать его.
            const queryInput = req.query;
            const { items, totalCount } = yield post_service_1.postService.findMany(queryInput);
            const postListOutput = (0, map_to_post_list_paginated_output_util_1.mapToPostListPaginatedOutput)(items, {
                pageNumber: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount,
            });
            res.status(http_statuses_1.HttpStatus.Ok).send(postListOutput);
        }
        catch (e) {
            (0, errors_handler_1.errorsHandler)(e, res);
        }
    });
}
