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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCollection = exports.blogCollection = exports.client = void 0;
exports.runDB = runDB;
exports.stopDb = stopDb;
const mongodb_1 = require("mongodb");
const settings_1 = require("../core/settings/settings");
const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';
/**
 * Устанавливает соединение с MongoDB и инициализирует коллекции.
 * @param url URI для подключения к MongoDB.
 */
function runDB(url) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.client = new mongodb_1.MongoClient(url);
        const db = exports.client.db(settings_1.SETTINGS.DB_NAME); // Используем имя базы данных из настроек
        exports.blogCollection = db.collection(BLOG_COLLECTION_NAME); // Инициализация коллекции блогов
        exports.postCollection = db.collection(POST_COLLECTION_NAME); // Инициализация коллекции постов
        try {
            yield exports.client.connect(); // Подключаемся к MongoDB
            yield db.command({ ping: 1 }); // Проверяем соединение
            console.log('✅ Connected to the database');
        }
        catch (e) {
            console.error(`❌ Database is not connected: ${e}`);
            yield exports.client.close(); // Закрываем соединение в случае ошибки
            throw e; // Перебрасываем ошибку для дальнейшей обработки
        }
    });
}
/**
 * Закрывает соединение с MongoDB.
 */
function stopDb() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.client) {
            throw new Error(`❌ No active client`);
        }
        yield exports.client.close();
        console.log('✅ Disconnected from the database');
    });
}
