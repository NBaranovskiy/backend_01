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
exports.createBlogsPostsListHandler = createBlogsPostsListHandler;
const blog_service_1 = require("../../application/blog.service");
const http_statuses_1 = require("../../../../core/types/http-statuses");
const errors_handler_1 = require("../../../../core/errors/errors.handler");
const post_service_1 = require("../../../post/application/post.service");
const map_to_post_output_util_1 = require("../../../post/routes/mappers/map-to-post-output.util");
function createBlogsPostsListHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.blogId;
            const blog = yield blog_service_1.blogService.findByIdOrFail(id);
            if (!blog) {
                res.status(http_statuses_1.HttpStatus.NotFound).send('Blog not found');
            }
            try {
                const postData = Object.assign(Object.assign({}, req.body), { blogId: id, blogName: blog.name // Assign the blogName here
                 });
                const createdPostId = yield post_service_1.postService.create(postData);
                const createdPost = yield post_service_1.postService.findByIdOrFail(createdPostId);
                const createdPostOut = (0, map_to_post_output_util_1.mapToPostOutput)(createdPost);
                res.status(http_statuses_1.HttpStatus.Created).send(createdPostOut);
            }
            catch (e) {
                (0, errors_handler_1.errorsHandler)(e, res);
            }
        }
        catch (e) {
            (0, errors_handler_1.errorsHandler)(e, res);
        }
    });
}
