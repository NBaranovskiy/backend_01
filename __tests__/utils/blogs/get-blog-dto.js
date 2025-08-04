"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogDto = getBlogDto;
function getBlogDto() {
    return {
        name: 'Feod',
        description: 'description',
        websiteUrl: 'url',
        createdAt: new Date(),
        isMembership: false
    };
}
