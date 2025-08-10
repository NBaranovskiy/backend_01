"use strict";
// src/services/blog/mappers/map-to-blog-output.util.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToBlogOutput = mapToBlogOutput;
function mapToBlogOutput(Blog) {
    return {
        id: Blog._id.toString(),
        name: Blog.name,
        websiteUrl: Blog.websiteUrl,
        description: Blog.description,
        isMembership: Blog.isMembership,
        createdAt: Blog.createdAt,
    };
}
