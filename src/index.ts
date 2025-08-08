import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './core/settings/settings';
import { runDB } from './db/mongo.db';

const app = express();

// Настройка приложения (middleware, маршруты)
setupApp(app);

// Инициализация подключения к MongoDB
runDB(SETTINGS.MONGO_URL).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Экспорт приложения для Vercel
export default app;