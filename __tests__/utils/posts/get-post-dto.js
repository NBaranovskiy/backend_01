"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostDto = getPostDto;
function getPostDto(postId) {
    return {
        postId,
        title: 'Post one',
        shortDescription: 'The desciption',
        content: 'some content',
        blogId: 'some blogId'
    };
}
