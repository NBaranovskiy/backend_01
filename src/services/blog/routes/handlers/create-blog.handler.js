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
exports.createBlogHandler = createBlogHandler;
const blog_service_1 = require("../../application/blog.service");
const map_to_driver_output_util_1 = require("../mappers/map-to-driver-output.util");
const http_statuses_1 = require("../../../../core/types/http-statuses");
const errors_handler_1 = require("../../../../core/errors/errors.handler");
function createBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdBlogId = yield blog_service_1.blogService.create(req.body.data.attributes);
            const createdBlog = yield blog_service_1.blogService.findByIdOrFail(createdBlogId);
            const blogOutput = (0, map_to_driver_output_util_1.mapToBlogOutput)(createdBlog);
            res.status(http_statuses_1.HttpStatus.Created).send(blogOutput);
        }
        catch (e) {
            (0, errors_handler_1.errorsHandler)(e, res);
        }
    });
}
