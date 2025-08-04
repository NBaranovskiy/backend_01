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
exports.postService = void 0;
const post_repository_1 = require("../repositories/post.repository");
exports.postService = {
    findMany(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_repository_1.postRepository.findMany(queryDto);
        });
    },
    findByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_repository_1.postRepository.findByIdOrFail(id);
        });
    },
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                title: dto.title,
                shortDescription: dto.shortDescription,
                content: dto.content,
                blogId: dto.blogId,
            };
            return post_repository_1.postRepository.create(newPost);
        });
    },
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_repository_1.postRepository.update(id, dto);
            return;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_repository_1.postRepository.delete(id);
            return;
        });
    },
    findPostByBlog(queryDto, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_repository_1.postRepository.findByIdOrFail(blogId);
            return post_repository_1.postRepository.findPostsByBlog(queryDto, blogId);
        });
    }
};
