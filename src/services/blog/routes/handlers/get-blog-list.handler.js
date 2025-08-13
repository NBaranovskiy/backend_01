"use strict";
// src/services/blog/handlers/get-blog-list.handler.ts
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
exports.getBlogListHandler = getBlogListHandler;
const errors_handler_1 = require("../../../../core/errors/errors.handler");
const map_to_blog_list_paginated_output_util_1 = require("../mappers/map-to-blog-list-paginated-output.util");
const blog_service_1 = require("../../application/blog.service");
const http_statuses_1 = require("../../../../core/types/http-statuses");
const express_validator_1 = require("express-validator"); // ✅ Импортируем validationResult
function getBlogListHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ✅ Проверяем результат валидации. Теперь req.query безопасно типизирован.
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(http_statuses_1.HttpStatus.BadRequest).json({ errors: errors.array() });
                return;
            }
            // ✅ req.query теперь имеет правильный тип BlogQueryInput
            const queryInput = req.query;
            const { items, totalCount } = yield blog_service_1.blogService.findMany(queryInput);
            const blogListOutput = (0, map_to_blog_list_paginated_output_util_1.mapToBlogListPaginatedOutput)(items, {
                pageNumber: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount,
            });
            res.status(http_statuses_1.HttpStatus.Ok).send(blogListOutput);
        }
        catch (e) {
            (0, errors_handler_1.errorsHandler)(e, res);
        }
    });
}
