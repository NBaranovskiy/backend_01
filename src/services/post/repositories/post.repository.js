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
exports.postRepository = void 0;
const mongo_db_1 = require("../../../db/mongo.db");
const mongodb_1 = require("mongodb");
const repository_not_found_error_1 = require("../../../core/errors/repository-not-found.error");
exports.postRepository = {
    findMany(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, searchPostTitleTerm, searchPostshortDescriptionTerm, searchPostcontentTerm, searchPostBlogIdTerm, } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = {};
            if (searchPostTitleTerm) {
                filter.title = { $regex: searchPostTitleTerm, $options: 'i' };
            }
            if (searchPostshortDescriptionTerm) {
                filter.shortDescription = { $regex: searchPostshortDescriptionTerm, $options: 'i' };
            }
            if (searchPostcontentTerm) {
                filter.content = { $regex: searchPostcontentTerm, $options: 'i' };
            }
            if (searchPostBlogIdTerm) {
                filter.blogId = { $regex: searchPostBlogIdTerm, $options: 'i' };
            }
            const items = yield mongo_db_1.postCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postCollection.countDocuments(filter);
            return { items, totalCount };
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    findByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield mongo_db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!res) {
                throw new repository_not_found_error_1.RepositoryNotFoundError('Post not exist');
            }
            return res;
        });
    },
    create(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield mongo_db_1.postCollection.insertOne(newPost);
            return insertResult.insertedId.toString();
        });
    },
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield mongo_db_1.postCollection.updateOne({
                _id: new mongodb_1.ObjectId(id),
            }, {
                $set: {
                    title: dto.title,
                    shortDescription: dto.shortDescription,
                    content: dto.content,
                    blogId: dto.blogId,
                },
            });
            if (updateResult.matchedCount < 1) {
                throw new repository_not_found_error_1.RepositoryNotFoundError('Post not exist');
            }
            return;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield mongo_db_1.postCollection.deleteOne({
                _id: new mongodb_1.ObjectId(id),
            });
            if (deleteResult.deletedCount < 1) {
                throw new repository_not_found_error_1.RepositoryNotFoundError('Post not exist');
            }
            return;
        });
    },
    findPostsByBlog(queryDto, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
            const filter = { 'blog.id': blogId };
            const skip = (pageNumber - 1) * pageSize;
            const [items, totalCount] = yield Promise.all([
                mongo_db_1.postCollection
                    .find(filter)
                    .sort({ [sortBy]: sortDirection })
                    .skip(skip)
                    .limit(pageSize)
                    .toArray(),
                mongo_db_1.postCollection.countDocuments(filter),
            ]);
            return { items, totalCount };
        });
    },
};
