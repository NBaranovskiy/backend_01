"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
const settings_1 = require("./core/settings/settings");
const mongo_db_1 = require("./db/mongo.db");
const app = (0, express_1.default)();
// Настройка приложения (middleware, маршруты)
(0, setup_app_1.setupApp)(app);
// Инициализация подключения к MongoDB
(0, mongo_db_1.runDB)(settings_1.SETTINGS.MONGO_URL).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});
// Экспорт приложения для Vercel
exports.default = app;
