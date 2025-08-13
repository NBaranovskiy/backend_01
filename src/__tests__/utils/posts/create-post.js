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
exports.createPost = createPost;
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
const http_statuses_1 = require("../../../src/core/types/http-statuses");
const generate_admin_auth_token_1 = require("../generate-admin-auth-token");
const paths_1 = require("../../../src/core/paths/paths");
const resource_type_1 = require("../../../src/core/types/resource-type");
const get_post_dto_1 = require("./get-post-dto");
function createPost(app, postDto) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield createPost(app);
        const defaultPostData = (0, get_post_dto_1.getPostDto)(post.data.id);
        const testPostData = {
            data: {
                type: resource_type_1.ResourceType.Posts,
                attributes: Object.assign(Object.assign({}, defaultPostData), postDto),
            },
        };
        const createdPostResponse = yield (0, supertest_1.default)(app)
            .post(paths_1.POST_PATH)
            .set('Authorization', (0, generate_admin_auth_token_1.generateBasicAuthToken)())
            .send(testPostData)
            .expect(http_statuses_1.HttpStatus.Created);
        return createdPostResponse.body;
    });
}
