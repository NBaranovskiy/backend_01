"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const paths_1 = require("./core/paths/paths");
const testing_route_1 = require("./services/test/routes/testing.route");
const blog_route_1 = require("./services/blog/routes/blog.route");
const post_route_1 = require("./services/post/routes/post.route");
const setupApp = (app) => {
    app.use(express_1.default.json());
    // Маршруты API
    app.use(paths_1.BLOG_PATH, blog_route_1.blogRoute);
    app.use(paths_1.POST_PATH, post_route_1.postRoute);
    app.use(paths_1.TESTING_PATH, testing_route_1.testingRoute);
    // Обработка корневого маршрута
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Сервер работает' });
    });
    // Обработка favicon
    app.get('/favicon.ico', (req, res) => {
        res.status(204).end();
    });
    return app;
};
exports.setupApp = setupApp;
