"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPostOutput = mapToPostOutput;
function mapToPostOutput(post) {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogId,
        createdAt: post.createdAt,
    };
}
