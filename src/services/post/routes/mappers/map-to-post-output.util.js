"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPostOutput = mapToPostOutput;
const resource_type_1 = require("../../../../core/types/resource-type");
function mapToPostOutput(Post) {
    return {
        data: {
            type: resource_type_1.ResourceType.Posts,
            id: Post._id.toString(),
            attributes: {
                title: Post.title,
                shortDescription: Post.shortDescription,
                content: Post.content,
                blogId: Post.blogId
            },
        },
    };
}
