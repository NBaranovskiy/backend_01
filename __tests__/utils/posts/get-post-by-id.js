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
exports.getPostById = getPostById;
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
const http_statuses_1 = require("../../../src/core/types/http-statuses");
const paths_1 = require("../../../src/core/paths/paths");
const generate_admin_auth_token_1 = require("../generate-admin-auth-token");
function getPostById(app, rideId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getResponse = yield (0, supertest_1.default)(app)
            .get(`${paths_1.POST_PATH}/${rideId}`)
            .set('Authorization', (0, generate_admin_auth_token_1.generateBasicAuthToken)())
            .expect(http_statuses_1.HttpStatus.Ok);
        return getResponse.body;
    });
}
