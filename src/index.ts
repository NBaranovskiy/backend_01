import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './core/settings/settings';
import { runDB } from './db/mongo.db';

// startApp + setup
// 1. Создаем и экспортируем экземпляр приложения
export const app = express();

// 2. Настраиваем приложение
setupApp(app);

// 3. Создаем асинхронную функцию для запуска сервера
const startApp = async () => {
  await runDB(SETTINGS.MONGO_URL);

  app.listen(SETTINGS.PORT, () => {
    console.log(`Example app listening on port ${SETTINGS.PORT}`);
  });
};

// 4. Запускаем сервер
startApp();