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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = createBlog;
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
const http_statuses_1 = require("../../../src/core/types/http-statuses");
const generate_admin_auth_token_1 = require("../generate-admin-auth-token");
const paths_1 = require("../../../src/core/paths/paths");
const get_blog_dto_1 = require("./get-blog-dto");
const resource_type_1 = require("../../../src/core/types/resource-type");
function createBlog(app, blogDto) {
    return __awaiter(this, void 0, void 0, function* () {
        const testBlogData = {
            data: {
                type: resource_type_1.ResourceType.Blogs,
                attributes: Object.assign(Object.assign({}, (0, get_blog_dto_1.getBlogDto)()), blogDto),
            },
        };
        const createdBlogResponse = yield (0, supertest_1.default)(app)
            .post(paths_1.BLOG_PATH)
            .set('Authorization', (0, generate_admin_auth_token_1.generateBasicAuthToken)())
            .send(testBlogData)
            .expect(http_statuses_1.HttpStatus.Created);
        return createdBlogResponse.body;
    });
}
