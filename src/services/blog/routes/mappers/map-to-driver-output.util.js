"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToBlogOutput = mapToBlogOutput;
const resource_type_1 = require("../../../../core/types/resource-type");
function mapToBlogOutput(Blog) {
    return {
        data: {
            type: resource_type_1.ResourceType.Blogs,
            id: Blog._id.toString(),
            attributes: {
                name: Blog.name,
                websiteUrl: Blog.websiteUrl,
                description: Blog.description,
                isMembership: Blog.isMembership,
                createdAt: Blog.createdAt,
            },
        },
    };
}
